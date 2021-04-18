//Stuff
const fs = require('fs');
const {promisify} = require('util');
const readFolder = promisify(fs.readdir);
const {Collection} = require('discord.js');
const {subDirectory} = require('./category.json');

/* Loggers */
const logs = require('../logger/logger');
const debugLog = logs.getLogger("HatsuDebug");
const errorLog = logs.getLogger("HatsuError");
const warnLog = logs.getLogger("HatsuWarn");
const infoLog = logs.getLogger("HatsuInfo");

class Commands {
    constructor(client) {
        this.client = client;
        this.client.collection = new Collection();
        //Method that need to Run
        this.LoadCommand
        this.ExecuteCommands()
    }

    get LoadCommand() {
        subDirectory.forEach(subDir => {
            readFolder(`./commands/${subDir}`).then(files =>
            {
                for (const command of files)
                {
                    if(!command.endsWith('.js')) return;
                    //Require Commands Files
                    const cmdFiles = require(`../../commands/${subDir}/${command}`);
                    //Delete Cache (if any)
                    delete require.cache[command]

                    //Add the Command Function to Collection
                    this.client.collection.set(cmdFiles.name, cmdFiles);
                    debugLog.debug(`Loading [${cmdFiles.name}]`);
                }
            }).catch(error =>
            {
                errorLog.error(`Failed to Load Commands!,${error}`);
                throw new Error(`Failed to Load Commands!, ${error}`);
            })
        });
    }

    ExecuteCommands() {
        this.client.on("message", async (msg) => {
            //Someone is Mentioning Me
            if (msg.mentions.has(this.client.user.id)) return msg.reply(`Hi There!, Type ***${process.env.PREFIX}help*** to see what i can do!`);
            //Prefix
            let prefix = process.env.PREFIX;
            /* Make Sure its Only Respond with Message that start with Prefix and do not respond from another Bot User */
            if (!msg.content.startsWith(prefix) || msg.author.bot || !msg.guild) return
            //Split Between Prefix,Command name and Command Arguments (if any)
            const userInput = msg.content.slice(prefix.length).trim().split(" ");
            //Make Everything to LowerCase and Get prefix with command Name
            const commandWithPrefix = userInput.shift().toLowerCase();

            /* Try to Get the Command from Collection or Command Alias (if any)*/
            const commands = this.client.collection.get(commandWithPrefix) || this.client.collection.find(alias => alias.shortname && alias.shortname.includes(commandWithPrefix));
            /**
             *
             * Under Construction
             */
            /*
            const adminCommands = ["moderation", "admin"]
            for (let a of adminCommands) {
                if (commands.categories === a) {
                    const OwnerGuildID = await ownerDB.findOne({
                        GuildID: msg.guild.id,
                    });
                    if (OwnerGuildID) {
                        for (let sensitiveCommands of OwnerGuildID.CommandsAccess) {
                            if (msg.author.id !== OwnerGuildID.GuildOwner) {
                                return msg.channel.send("You Cannot Use this Commands!").then(c => c.delete({timeout: 5000}));
                            }
                        }
                    }
                }
            }

             */
            //console.log(String(commands.categories));


            /* If the Command is Not Found in Collection Say Command is Not Available */
            if (!commands || commands.categories === undefined) {
                msg.reply("I Can't Find That Command!");
                return warnLog.warn(`Cannot Find Command "${commandWithPrefix}"\n` + `Requested From: ${msg.guild.name} With ID:${msg.guild.id}`)
            }
            /* This Where bot its Executing the Commands */
            try {
                commands.execute(msg, userInput);
                infoLog.info(`Execute "${commands.name}" Command!`)
            } catch (err) {
                //Error Handler
                errorLog.error(`Something Wrong when try to Run "${commandWithPrefix}"\n` + `Reason:${err}\n` + `Requested from ${msg.guild.name} With ID:${msg.guild.id}`)
            }
        });
    }
}

module.exports = Commands