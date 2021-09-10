const log = require('npmlog');

class HatsuLogger {
    constructor() {
        this.consoleLevel = "info";
        switch(process.argv[2]) {
            case "--debug":
                this.consoleLevel = "verbose"
                break;
            case "--silent":
                this.consoleLevel = "silent"
                console.log("You are in silent mode!. Hatsu will not show you whats going on in the background until she got an error!");
                break
            default: break
        }
        log.level = this.consoleLevel;
    }
    /* Logger Methods */
    debugLog(prefix, message) {
        log.verbose(prefix, message);
    }
    warnLog(prefix, message) {
        log.warn(prefix, message);
    }
    errorLog(prefix, message) {
        log.error(prefix, message);
    }
    infoLog(prefix, message) {
        log.info(prefix, message);
    }
}
exports.HatsuLogger = HatsuLogger