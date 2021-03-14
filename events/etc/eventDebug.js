/* Loggers */
const logs = require('../../helper/logger/logger');

const debugLogs = logs.getLogger("HatsuDebug");

module.exports = {
    event: "debug",
    once: false,
    async run(info) {
        debugLogs.debug(info);
    }
}