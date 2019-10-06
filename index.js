// load .env
require("dotenv").config()

process.stdout = msg => log("info", msg)
process.stderr = msg => log("error", msg)

// get Koa
const Koa = require("koa")

// get Logger
const { log } = require("./utils/logger")

// read required env vars
const { APP_PORT = 3000 } = process.env

// Log that our application has started
log("info", `Application Initializing.`)
const app = new Koa()

require("./middleware").forEach(m => app.use(m))

app.listen(APP_PORT, () => {
  log("info", `Application listening on port ${APP_PORT}.`)
})
