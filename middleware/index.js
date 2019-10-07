const { bodyParser } = require("./bodyParser")
const { timeRequest } = require("./timeRequest")
const { verifySignature } = require("./verifySignature")
const { runBuildScript } = require("./runBuildScript")

module.exports = app => [
    bodyParser,
    timeRequest,
    verifySignature,
    runBuildScript
].forEach(m => app.use(m))
