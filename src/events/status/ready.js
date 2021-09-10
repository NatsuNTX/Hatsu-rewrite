const os = require('os');
const {version} = require('../../../package.json');
const {mainsplash, secondarysplash} = require('../../../splash.json');

/* Logger */
const {hatsuLogger} = require('../../Support/Logger');

module.exports = {
    events: "ready",
    once: true,
    run(client) {
        hatsuLogger.infoLog("", mainsplash);
        hatsuLogger.infoLog("", secondarysplash);
        hatsuLogger.infoLog("Hatsu", "Hatsu is Running!");
        hatsuLogger.infoLog("Hatsu", `Hatsu is Logged as [${client.user.username}] | ${version}`);
        hatsuLogger.infoLog("SYSTEM", `OS:${process.platform} | ${os.arch()}`);
        hatsuLogger.infoLog("SYSTEM", `Node Version:${process.version}`);
        hatsuLogger.infoLog("SYSTEM", `Memory:${(process.memoryUsage.rss() / 1048576).toFixed(2)}MB of ${(os.totalmem() / 1048576).toFixed(2)}MB`);
        hatsuLogger.infoLog("SYSTEM", `CPU:${os.cpus()[0].model}`);
        hatsuLogger.infoLog("SYSTEM", `Host:${os.hostname()}`);
    }
}