//Libs
const {Client} = require("discord.js"); //Import Client

/* Logger */
const logs = require('../helper/logger/logger');
const infoLogs = logs.getLogger("HatsuInfo");

/* Activity! */

/* This Where all Script need to Load At the same time with Client */
const events = require('../helper/events/loadEvents');
const DB = require('../helper/database/database');

/* Main Class */
class hatsuku extends Client {
    constructor(opts, token) {
        super(opts);
        this.keys = token
        this.loadHatsuku()
    }
    async loadHatsuku() {
        //LOGIN
        await this.login(this.keys)
        //Load Script
        events(this) //Events Handler
        DB() //Database
        this.infoBot //INFO
    }
    /* INFO */
    get infoBot() {
        infoLogs.info(`Hatsuku is Login as ${this.user.username}`);
    }


}

module.exports = hatsuku