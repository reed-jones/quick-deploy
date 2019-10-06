const fs = require("fs")
const path = require("path")

const { log } = require("../utils/logger")
const { buildScript } = require("../utils/buildScript")

module.exports.runBuildScript = async ctx => {
  try {
    // Attempt to match webhook
    const {
      groups: { domain }
    } = ctx.request.url.match(/^\/deploy\/(?<domain>.*\..{2,10}$)/)

    const file = path.resolve("scripts", domain)

    if (fs.existsSync(file)) {
      log("debug", `Build script for ${domain} found.`)

      buildScript(file, domain)
      log("debug", `Build script for ${domain} initiated successfully.`)
      ctx.body = `Mission Accomplished.`
    } else {
      log("error", `Build script for ${domain} not found.`)
      ctx.status = 404
      ctx.body = `These aren't the droids you're looking for.`
    }
  } catch (err) {
    log("error", `Error occurred with build script`)
    log("error", err)
  }
}
