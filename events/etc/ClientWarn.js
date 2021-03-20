/* Loggers */
const logs = require('../../helper/logger/logger');

const warnLogs = logs.getLogger("HatsuWarn");

module.exports = {
    event: "warn",
    once: false,
    async run(info) {
        warnLogs.warn(info);
    }
}