const {Client} = require('discord.js');
const {EventsHandler} = require('../Support/Events');
const {sendError} = require('../Support/error');
const {HatsuCommands} = require('../Support/Commands');

class HatsuClient extends Client {
    constructor(options) {
        super(options);
        this.loadSupported().catch(err => {sendError(err)});
    }
    async login() {
        await super.login(process.env.TOKEN);
    }
    async loadSupported() {
        new EventsHandler(this);
        new HatsuCommands(this);
    }
}
exports.HatsuClient = HatsuClient