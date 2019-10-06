const { log } = require("../utils/logger")

module.exports.timeRequest = async (ctx, next) => {
  const start = Date.now()
  log("info", `START: ${ctx.request.method}: ${ctx.request.url}`)

  try {
    await next()
  } catch {}

  const ms = Date.now() - start
  log("info", `END:   ${ctx.request.method}: ${ctx.request.url} - ${ms}ms`)
}
