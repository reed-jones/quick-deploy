const { promisify } = require("util")
const path = require("path")
const fs = require("fs")
const appendFile = promisify(fs.appendFile)

const {
  LOG_LEVEL = "info",
  LOG_BASE_NAME = "quick_deploy",
  LOG_LOCATION = "logs"
} = process.env

const LOG_LEVELS = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
}

// can't log if no log location is set
if (!fs.existsSync(path.resolve(LOG_LOCATION))) {
  fs.mkdirSync(path.resolve(LOG_LOCATION))
}

module.exports.log = (level, message) => {
  if (LOG_LEVELS[level] >= LOG_LEVELS[LOG_LEVEL] && message) {
    let date = new Date()
    // normalizer for log message
    // [level ] [Sun, 06 Oct 2019 23:09:45 GMT] Log Message Goes Here.
    const format = msg =>
      `[${level.toUpperCase().padEnd(5, " ")}] [${date
        .toUTCString()
        .padEnd(29, " ")}] ${msg}\n`

    // ensure it ends with a newline
    message = `${message}`.endsWith("\n") ? `${message}` : `${message}\n`

    // split up multi-lines. One line per log entry.
    let formattedMessages = message.split("\n").slice(0, -1)

    const logFile = `${LOG_BASE_NAME}_${date.getFullYear()}_${date.getMonth() +
      1}_${date.getDate()}.log`

    // write each line
    formattedMessages.forEach(msg => {
      appendFile(path.resolve(LOG_LOCATION, logFile), format(msg))
    })
  }
}
