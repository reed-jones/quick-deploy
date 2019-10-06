const crypto = require("crypto")

const { GITHUB_WEBHOOK_SECRET } = process.env

module.exports.signBlob = blob => {
  return `sha1=${crypto
    .createHmac("sha1", GITHUB_WEBHOOK_SECRET)
    .update(blob)
    .digest("hex")}`
}
