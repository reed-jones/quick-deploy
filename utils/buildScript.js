const spawn = require("child_process").spawn

const { log } = require("./logger")

module.exports.buildScript = async (file, domain) => {
  log("info", `Starting build for ${domain}`)

  const child = spawn(`sh`, [file])

  // use child.stdout.setEncoding('utf8'); if you want text chunks
  child.stdout.on("data", chunk => {
    log("info", chunk)
  })
  child.stderr.on("data", chunk => {
    log("error", chunk)
  })
  child.on("close", code => {
    log("info", `Build script for ${domain} exited with code ${code}`)
  })
}
