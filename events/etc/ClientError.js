/* Loggers */
const logs = require('../../helper/logger/logger');

const errorLogs = logs.getLogger("HatsuError");

module.exports = {
    event: "error",
    once: false,
    async run(error) {
        errorLogs.error(error);
    }
}