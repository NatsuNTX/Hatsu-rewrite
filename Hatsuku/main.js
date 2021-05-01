//Libs
const {Client} = require("discord.js"); //Import Client
const SaveBotProfile = require('../img');
const clr = require('chalk');

/* Logger */
const logs = require('../helper/logger/logger');
const infoLogs = logs.getLogger("HatsuInfo");
const debug = logs.getLogger("HatsuDebug");

/* Activity! */
const activity = require('./activity/activity');

/* This Where all Script need to Load At the same time with Client */
const webServer = require('../http/http');
const events = require('../helper/events/loadEvents');
const DB = require('../helper/database/database');
const commands = require('../helper/commands/Commands');
const playerNodes = require('../helper/musicplayer/PlayerNodes');
const playerHubs = require('../helper/musicplayer/PlayerHUB');
const playerControl = require('../helper/musicplayer/controls/PlayerControls');
const playerFilters = require('../helper/musicplayer/filters/PlayerFilters');
const actionCenter = require('../helper/Moderation/actionCenter');

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

        /* All Moderation Stuff */
        this.botAction = new actionCenter();

        /* Lavalink */
        const {PlayerNodeConfig,PlayerNodeOptions} = require('../mastah/PlayerNode.json');
        this.playerNodes = new playerNodes(this,PlayerNodeConfig,PlayerNodeOptions);
        this.playerHubs = new playerHubs(this);
        this.playerControls = new playerControl(this);
        this.playerFilters = new playerFilters(this);
    }

    /* INFO */
    get infoBot() {
        debug.debug("Starting Http Web Server.");
        console.log(clr.cyan("Starting WebServer"));
        webServer(this.user.username, this.user.displayAvatarURL({format:"png", size:1024}));
        infoLogs.info(`Hatsuku is Login as ${this.user.username}`);
        SaveBotProfile(this.user.displayAvatarURL({format:"png", size:1024}));
    }


}

module.exports = hatsuku