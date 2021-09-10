/* Stuff Needs */
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {readdirSync} = require('fs');
const {hatsuLogger} = require('../../Logger');

class RegisterSlashCommand {
    constructor() {
    }

    async register() {
        let commands = [];

        for (const mainDir of readdirSync('./src/command/', {withFileTypes:true})) {
            if(!mainDir.isDirectory()) continue;
            for(const file of readdirSync(`./src/command/${mainDir.name}`, {withFileTypes:true})) {
                if(!file.isFile()) continue;
                const cmdfunc = require(`../../../command/${mainDir.name}/${file.name}`);
                commands.push(cmdfunc.data.toJSON());
            }
        }
        const res = new REST({version: '9'}).setToken(process.env.TOKEN);
            try {
                if(process.env.DEV_MODE) {
                    hatsuLogger.infoLog("Slash Builder", "You are in Dev Mode!,To make the Commands Available in all Guilds\n " +
                        "Please Set DEV_MODE to False");
                    await res.put(Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID), {body:commands});
                    hatsuLogger.infoLog("Slash Builder", "Successfully Register Slash Commands! to Dev Guild!");
                    return {isloaded:true}
                } else {
                    await res.put(Routes.applicationCommands(process.env.CLIENT_ID), {body:commands});
                    hatsuLogger.infoLog("Slash Builder", "Successfully Register Slash Commands!\n " +
                        "You May need to wait for 1 hour to see the slash commands!");
                    return {isloaded:true}
                }
            } catch (e) {
                hatsuLogger.errorLog("Slash Builder", `Failed to Register Slash Commands!\n` +
                    `Error:${e}\n` + `Make sure you already follow all step and then delete slash.json and try again!`);
                return {isloaded:false}
            }
    }
}
exports.RegisterSlashCommand = RegisterSlashCommand;