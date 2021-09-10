/* Logger */
const {hatsuLogger} = require('../../Support/Logger');

module.exports = {
    events: "debug",
    once: false,
    run(info) {
        hatsuLogger.debugLog("Hatsu", info);
    }
}