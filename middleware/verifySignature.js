const { signBlob } = require("../utils/signBlob")
const { log } = require("../utils/logger")

module.exports.verifySignature = async (ctx, next) => {
  const sig = ctx.request.headers["x-hub-signature"]
  const isBlobMatchingSig = sig === signBlob(JSON.stringify(ctx.request.body))

  // TODO: Verify Github username

  if (isBlobMatchingSig) {
    await next()
  } else {
    log("error", "Unauthenticated Request")
    ctx.status = 401
    ctx.body = "Unauthenticated Request."
  }
}
