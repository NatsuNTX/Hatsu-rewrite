//Stuff
const saveToDatabase = require('../../helper/database/sendData');
const database = new saveToDatabase();

/* Logs */
const logs = require('../../helper/logger/logger');
const debugLogs = logs.getLogger("HatsuDebug");
const infoLogs = logs.getLogger("HatsuInfo");

module.exports = {
    event: "guildDelete",
    once: false,
    async run(guild) {
        infoLogs.info(`Hatsuku is Leave from ${guild.name} With ID "${guild.id}" Maybe I Got Kick For Some Reason :(`);
        debugLogs.debug(`Hatsuku get Remove from ${guild.name} | ${guild.id} Removing Guild Data From Database`);
        await database.DeleteAllSaveData(guild.id);
    }
}