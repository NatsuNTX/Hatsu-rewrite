/* Logger */
const {hatsuLogger} = require('../../Support/Logger');
const {sendError} = require('../../support/error');

module.exports = {
    events: "error",
    once: false,
    run(error) {
        hatsuLogger.errorLog("Hatsu", `Client has Encounters an Error!\n Error:${error}`);
        sendError(error);
    }
}