//Stuff
const activity = require('../../mastah/activity.json');
const {isStream,ActivityList,Status,streamLink} = require('../../mastah/activity.json') //Why i Put Twice :/

/* Loggers */
const logs = require('../../helper/logger/logger');
const errorLogs = logs.getLogger("HatsuError");
const debugLogs = logs.getLogger("HatsuDebug");

function MyActivity(client) {
    this.bot = client;

    /* Activity Part */
    debugLogs.debug('Starting Hatsuku Activity');
    debugLogs.debug('Set Activity With Given Setting\n' + `${JSON.stringify(activity)}`);

    try {
        if(isStream) {
            this.bot.user.setStatus(`${Status}`);
            this.bot.user.setActivity(`[${process.env.PREFIX}help] | Online!`, {type:"STREAMING",url:`${streamLink}`});
            setInterval(() => {
                this.bot.user.setActivity(`[${process.env.PREFIX}help] | ${chooseRandomWord(ActivityList)}`, {type:"STREAMING",url:`${streamLink}`});
            }, 30000);
        } else {
            this.bot.user.setStatus(`${Status}`);
            this.bot.user.setActivity(`[${process.env.PREFIX}help] | Online!`);
            setInterval(() => {
                this.bot.user.setActivity(`[${process.env.PREFIX}help] | ${chooseRandomWord(ActivityList)}`);
            },30000);
        }
    } catch (e) {
        errorLogs.error(`Cannot Load Activity, ${e}`);
    }

    function chooseRandomWord(words) {
        return words[Math.floor(Math.random() * words.length -1) + 1]
    }


}
module.exports = MyActivity;