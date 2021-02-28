//Libs
const {Client} = require("discord.js"); //Import Client

/* This Where all Script need to Load At the same time with Client */
const events = require('../helper/events/events');

/* Main Class */
class hatsuku extends Client {
    constructor(opts, token) {
        super(opts);
        this.keys = token
        this.loadHatsuku()
    }
    async loadHatsuku() {
        await this.login(this.keys)
        //Load Script
        new events(this)
        /*
        //Check if Bot is Ready Or Not
        this.on("ready", () => console.log("Hatsuku is Login"))
         */
    }
    

}

module.exports = hatsuku