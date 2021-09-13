const log = require('npmlog');
const log2file = require('log-to-file');

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
        this.writeToFile(JSON.stringify({"DEBUG": `${prefix}:${message}`}));
    }
    warnLog(prefix, message) {
        log.warn(prefix, message);
        this.writeToFile(JSON.stringify({"WARN": `${prefix}:${message}`}));
    }
    errorLog(prefix, message) {
        log.error(prefix, message);
        this.writeToFile(JSON.stringify({"ERROR": `${prefix}:${message}`}));
    }
    infoLog(prefix, message) {
        log.info(prefix, message);
        this.writeToFile(JSON.stringify({"INFO": `${prefix}:${message}`}));
    }
    writeToFile(object) {
        this.conoutput = []
        this.conoutput = object;
        log2file(this.conoutput.toString(), "Hatsu.log");
    }
}
exports.HatsuLogger = HatsuLogger