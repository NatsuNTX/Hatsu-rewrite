const {hatsuLogger} = require('../Logger');

const shutdown = (client) => {
    process.on("SIGINT", () => {
        hatsuLogger.warnLog("Shutdown", "CTRL+C Detected!, Shutting down Hatsu");
        client.destroy()
        process.exit(0);
    });
}
exports.shutdown = shutdown