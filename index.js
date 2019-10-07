// load .env
require("dotenv").config()

// get Koa
const Koa = require("koa")

// get Logger
const { log } = require("./utils/logger")

// read required env vars
const { APP_PORT = 3000 } = process.env

// Log that our application Is initializing
log("info", `Application Initializing.`)

// create a new Koa instance
const app = new Koa()

// apply all our middleware
require("./middleware")(app)

// begin listening on port APP_PORT
app.listen(
    APP_PORT,
    // Log that our application is now listening
    () => log("info", `Application listening on port ${APP_PORT}.`)
)
