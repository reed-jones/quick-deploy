const { bodyParser } = require("./bodyParser")
const { timeRequest } = require("./timeRequest")
const { verifySignature } = require("./verifySignature")
const { runBuildScript } = require("./runBuildScript")

module.exports = [bodyParser, timeRequest, verifySignature, runBuildScript]
