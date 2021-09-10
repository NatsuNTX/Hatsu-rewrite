const {Client} = require('discord.js');
const {EventsHandler} = require('../Support/Events');
const {sendError} = require('../Support/error');
const {shutdown} = require('../Support/Shutdown');
const {ShoukakuNodes,HatsuPlayerMap} = require('../Support/Music');
const {lavalinkOptions} = require('../../lavalink.json');
const {HatsuCommands} = require('../Support/Commands');

class HatsuClient extends Client {
    constructor(options) {
        super(options);
        this.playerNode = 0
        this.loadSupported().catch(err => {sendError(err)});
    }
    async login() {
        await super.login(process.env.TOKEN);
    }
    async loadSupported() {
        new EventsHandler(this);
        new HatsuCommands(this);
        this.shounodes = new ShoukakuNodes(this, lavalinkOptions);
        this.playermaps = new HatsuPlayerMap(this);
        shutdown(this);
    }
}
exports.HatsuClient = HatsuClient