//Stuff
const {version,author} = require('../../package.json');
const os = require('os');

/* Logger */
const logs = require('../../helper/logger/logger');
const logInfo = logs.getLogger("HatsuInfo");

/* RAM Calculation */
const mem = os.totalmem / 1073741824

/* Main */
module.exports = {
    event: "ready",
    once: false,
    run() {
        logInfo.info(`Hatsuku is Ready! | Version:${version}`);
        logInfo.info(`Developer:${author}`);
        logInfo.info(`NodeJS:${process.version}`);
        logInfo.info("SYSTEM INFO:\n", `OS:${os.type}\n`, `Platform:${os.platform}\n`, `SYSUSER:${os.hostname}\n`, `Architecture:${os.arch}\n`,`OS Version:${os.release}\n`, `RAM:${mem.toFixed(2)}\n`, `CPU:${os.cpus(1)[0].model}`)
    }
}