require('dotenv').config()
const { Azuma } = require("azuma");
const path = require('path');
const {Intents} = require('discord.js');
const {HatsuClient} = require('./src/Hatsu/HatsuClient');
const {hatsuLogger} = require('./src/Support/Logger');
const {writeFileSync, existsSync} = require('fs');
const {registerSlashCommand} = require('./src/Support/Commands');

const hatsuOptions = {
    disableMentions: 'everyone',
    restRequestTimeout: 15000,
    intents: [Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGE_TYPING]
}
const shardOptions = {
    clientOptions: hatsuOptions,
    client: HatsuClient,
    timeout: 6000,
    token: process.env.TOKEN
}
const rlimit = {
    handlerSweepInterval: 50000,
    hashInactiveTimeout: 250000,
    requestOffset: 500
}

const azuma = new Azuma(path.join(__dirname, '/src/Base Cluster.js'), shardOptions, rlimit);
if (!existsSync('slash.json')) {
    registerSlashCommand.register().then(res => {
        writeFileSync('slash.json', JSON.stringify(res));
        if (res.isloaded) {
            return azuma.spawn();
        } else {
            hatsuLogger.errorLog("Hatsu", "Cannot Run the Bot Because the Command is Not Yet Register!");
            process.exit(1);
        }
    });
} else {
    const a = require('./slash.json');
    if(a.isloaded) {
        return azuma.spawn();
    } else {
        hatsuLogger.errorLog("Hatsu", "Cannot Run the Bot Because the Command is Not Yet Register!");
        process.exit(1);
    }
}

/* Azuma Events */
azuma.on('debug', msg => {
    hatsuLogger.debugLog("Azuma", msg);
});
azuma.rest.on("onTooManyRequest", (info) => {
    hatsuLogger.warnLog("Azuma", `Ohh...no i Got 429!, Please stop the bot Right now\n ` +
        `Otherwise you will get ban!`);
    hatsuLogger.warnLog("Azuma", `Request:${info.request}\nResponse: ${info.response}`);
});
azuma.rest.on("onRequest", info => {
    hatsuLogger.debugLog("Azuma", `Azuma[Hatsu] --> Discord:${info.request}`);
});
azuma.rest.on("onResponse", info => {
    hatsuLogger.debugLog("Azuma", `Azuma[Hatsu] <--- Discord:${info.response}`);
});