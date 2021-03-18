//Libs
const {Client} = require("discord.js"); //Import Client
const SaveBotProfile = require('../img');

/* Logger */
const logs = require('../helper/logger/logger');
const infoLogs = logs.getLogger("HatsuInfo");

/* Activity! */
const activity = require('./activity/activity');

/* This Where all Script need to Load At the same time with Client */
const events = require('../helper/events/loadEvents');
const DB = require('../helper/database/database');
const commands = require('../helper/commands/Commands');
const playerNodes = require('../helper/musicplayer/PlayerNodes');
const playerHubs = require('../helper/musicplayer/PlayerHUB');
const playerControl = require('../helper/musicplayer/controls/PlayerControls');

/* Main Class */
class hatsuku extends Client {
    constructor(opts, token) {
        super(opts);
        this.keys = token
        this.loadHatsukuAndAdditionalScript()
    }
    async loadHatsukuAndAdditionalScript() {
        //LOGIN
        await this.login(this.keys);
        //Load Script
        events(this); //Events Handler
        new commands(this);
        DB(); //Database
        this.infoBot //INFO
        activity(this); //Activity

        /* Lavalink */
        const {PlayerNodeConfig,PlayerNodeOptions} = require('../mastah/PlayerNode.json');
        this.playerNodes = new playerNodes(this,PlayerNodeConfig,PlayerNodeOptions);
        this.playerHubs = new playerHubs(this);
        this.playerControls = new playerControl(this);
    }

    /* INFO */
    get infoBot() {
        infoLogs.info(`Hatsuku is Login as ${this.user.username}`);
        SaveBotProfile(this.user.displayAvatarURL({format:"png", size:1024}));
    }


}

module.exports = hatsuku