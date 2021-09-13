const {Collection} = require('discord.js');
const {hatsuLogger} = require('../../Logger');
const {readdirSync} = require('fs');

class HatsuCommands {
    constructor(client) {
        this.hatsu = client;
        this.hatsu.maps = new Collection();
        this.getCommand()
    }
    getCommand() {
        for (const subdir of readdirSync('./src/command/', {withFileTypes:true})) {
            if(!subdir.isDirectory()) continue;
            for (const file of readdirSync(`./src/command/${subdir.name}`, {withFileTypes:true})) {
                if(!file.isFile()) continue;
                const func = require(`../../../command/${subdir.name}/${file.name}`);
                this.hatsu.maps.set(func.data.name, func);
                hatsuLogger.debugLog("Command", `Loaded [${func.data.name}] Command`);
            }
        }
        this.loadCommand()
    }
    loadCommand() {
        this.hatsu.on('interactionCreate', async (interaction) => {
            if(!interaction.isCommand()) return
            const slashCommand = this.hatsu.maps.get(interaction.commandName);
            if(!slashCommand) return interaction.channel.send("Cannot Find That Command!");
            try {
                await slashCommand.run(interaction);
                return hatsuLogger.infoLog("Command", `Successfully Run [${interaction.commandName}] from [${interaction.guild.name} | ${interaction.guild.id}]`);
            } catch (error) {
                await interaction.channel.send("Failed to Run that Command,Please Copy this Message below and tell my developer to check it!\n" +
                    "```" + error + "```");
                return hatsuLogger.errorLog("Command", `Failed to Run ${interaction.commandName} Command!\n ${error}`);
            }
        });
        this.hatsu.on("messageCreate", (msg) => {
            if(msg.mentions.has(this.hatsu.user.id) && !msg.content.includes('@here') && !msg.content.includes('@everyone')) {
                return msg.channel.send("Hi...,Please use slash to run my command!");
            }
        })
    }
}
exports.HatsuCommands = HatsuCommands;