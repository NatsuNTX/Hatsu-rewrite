/**
 This All Moderation Stuff Do they Job
 */

//Stuff
const {DONTHAVE_PERMISSION, MISSING_ARGUMENTS} = require('../../mastah/expression.json');
const embed = require('../Embed/NormalEmbed');
const send = require('../database/sendData');
const database = new send()
const get = require('../database/getData');
const getData = new get();


/* Logger */
/*
const logs = require('../logger/logger');
const debugLog = logs.getLogger("HatsuDebug");
const errorLog = logs.getLogger("HatsuError");
const warnLog = logs.getLogger("HatsuWarn");
const infoLog = logs.getLogger("HatsuInfo");

 */

/* Let's Start Write a Code shall we? */
class ActionCenter {
    /**
     * Set Custom Prefix for Specific Guilds
     * @param Newprefix New Custom Prefix
     * @param message Discord Message Module
     * @returns {Promise<Message>}
     */
    async setPrefix(Newprefix, message) {
        this.prefix = Newprefix;
        this.msg = message;

        //Check for Permission so No one can Abuse this Command
        if (!this.msg.member.hasPermission("ADMINISTRATOR") && this.msg.author.id !== this.msg.guild.owner.id) return this.msg.channel.send(new embed({
            title: "Access Denied!",
            description: `${this.msg.author} You Don't Have Permission to use this Command!`,
            image: {url: DONTHAVE_PERMISSION}
        }));

        const newPrf = String(this.prefix);

        if (newPrf === '' || !newPrf) {
            return this.msg.channel.send(`To Set New Prefix Please Type ***${process.env.PREFIX}prefix [New Prefix]***\n Current Prefix for this Guild ***"${await getData.getPrefix(this.msg.guild.id) ? await getData.getPrefix(this.msg.guild.id) : process.env.PREFIX}"***`);
        }
        const setPrf = await database.setPrefix(newPrf, this.msg.guild.id, this.msg.guild.name);

        switch(setPrf.Code) {
            case -4:
                await this.msg.channel.send(`Sorry But You Only Can Set the Prefix Up to 3 Character`);
                break;
            case -2:
                await this.msg.channel.send(`Ohh..oh., Something Wrong While Try to Save New Prefix!,You Can Report to My Master to Fix this Error!\n Error:${setPrf.Message}`);
                break;
            default:
                await this.msg.channel.send(`Successfully Set Custom Prefix for This Guild!, Current Prefix is ***"${await getData.getPrefix(this.msg.guild.id)}"***`);
                break;
        }

        /*
        if (!setPrf) return this.msg.channel.send(`Successfully Set Custom Prefix for This Guild!, Current Prefix is ***"${await getData.getPrefix(this.msg.guild.id)}"***`)
        if (setPrf.Code === -4) return this.msg.channel.send(`Sorry But You Only Can Set the Prefix Up to 3 Character`);
        if (setPrf.Code === -2) return this.msg.channel.send(`Ohh..oh., Something Wrong While Try to Save New Prefix!,You Can Report to My Master to Fix this Error!\n Error:${setPrf.Message}`);
         */
    }
    async warnAUser(message, userID, reason,  GuildID) {
        this.msg = message;
        this.warnUserMention = userID;
        this.warnReason = reason;
        this.guild = GuildID;

        if(!this.warnUserMention) return this.msg.channel.send("Please Mention a User along with a Reason!,\n ***Exmp: warn @userToWarn [Reason]***");

        //Cut the Mention so only remain the reason
        const usrin = this.warnReason.join(" ");
        const reasons = usrin.slice(22);


        //Check if User Input a Reason
        if(!reasons) return this.msg.channel.send(new embed({
            title: 'Missing Arguments',
            description: `${this.msg.author} Please Tell me a Reason, So i will know why you want to Warn ***${this.warnUserMention.username}***`,
            image: {url: MISSING_ARGUMENTS}
        }))
    }
}

module.exports = ActionCenter