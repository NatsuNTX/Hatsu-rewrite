const {Shoukaku, Libraries} = require('shoukaku');
const {hatsuLogger} = require('../../Logger');

class ShoukakuNodes extends Shoukaku {
    constructor(client, opts) {
        super(new Libraries.DiscordJS(client), [{
            name: process.env.LAVALINK_NAME,
            url: `${process.env.LAVALINK_HOST}:${process.env.LAVALINK_PORT}`,
            auth: process.env.LAVALINK_PASSWORD
        }], opts);
        this.clients = client;
        this._shoukakuEvents()
    }
    _shoukakuEvents() {
        this.on('ready', (name) => {
            hatsuLogger.infoLog("MUSICNODE" , `Connected to ${name} on port ${process.env.LAVALINK_PORT}`);
            this.clients.playerNode = 0
        });
        this.on('debug', (name, info) => {
            hatsuLogger.debugLog("MUSICNODE", `${name}:${info}`);
        });
        this.on('error', (name, err) => {
            hatsuLogger.errorLog("MUSICNODE", `Error on Node:${name}\n Error:${err}`);
            this.clients.playerNode = -1
        });
        this.on('close', (name, code, reason) => {
            hatsuLogger.errorLog("MUSICNODE", `Connection Close from ${name} | ${code} | ${reason}`);
        });
        this.on('playerReady', (name,player) => {
            hatsuLogger.debugLog("MUSICNODE", `Player Has been Created!\n Name:${name}\n Player${player}`);
        });
        this.on('playerDestroy', (name, player) => {
            hatsuLogger.debugLog("MUSICNODE", `Player Has been Destroy!\n Name:${name}\n Player${player}`);
        });
        this.on('disconnect', (name, player, move) => {
            if(move) {
                hatsuLogger.warnLog("MUSICNODE", `Player Has been move to another Node!`);
            }
            player.map(ply => ply.connection.disconnect());
            hatsuLogger.warnLog("MUSICNODE", `Player has been disconnected!\n [${name}]`);
        });
    }
}
exports.ShoukakuNodes = ShoukakuNodes