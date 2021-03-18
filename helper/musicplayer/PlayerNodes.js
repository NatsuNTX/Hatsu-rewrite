//stuff
const {Shoukaku} = require('shoukaku');

/* Loggers */
const nodeLogs = require('../logger/logger');
const nodeDebug = nodeLogs.getLogger("HatsuMusicDebug");
const errorLogs = nodeLogs.getLogger("HatsuError");
const nodeError = nodeLogs.getLogger("HatsuMusicError");
const nodeWarn = nodeLogs.getLogger("HatsuMusicWarn");
const nodeInfo = nodeLogs.getLogger("HatsuMusicInfo");


class PlayerNodes extends Shoukaku {
    /**
     *
     * @param client Discord.js Client (Basically this is Your Bot Client)
     * @param lavalink Lavalink Node (exmpl:Host,Port,Password and etc)
     * @param options Lavalink Options see (https://deivu.github.io/Shoukaku/?api#ShoukakuConstants#ShoukakuOptions) for more Options
     */
    constructor(client,lavalink,options) {
        //console.log(`${JSON.stringify(lavalink)} | ${JSON.stringify(options)}`);
        super(client,lavalink,options);
        this.PlayerStatus
    }
    get PlayerStatus() {
        this.on("ready", (name) => {
            nodeDebug.debug(`Connected to Node "${name}"`);
            nodeInfo.info(`Successfully Connect To Node "${name}"`);
        });

        this.on("error", (name, error) => {
            nodeError.error(`Something wrong when try to Connect to ${name}\n` + `${error}`);
            errorLogs.error("Found Error in PlayerNodes all Music Commands is Now Temporarily Disable!");
        });
        this.on("close", (name, code, reason) => {
            nodeWarn.warn(`Connection Close from ${name} with Code:${code}\n` + `Reason:${reason}\n` + "Reconnecting in 25 Second");
        });
        this.on("debug", (name, data) => nodeDebug.debug(`Server Name:${name} | Info:${data}`));
    }
}

module.exports = PlayerNodes;
