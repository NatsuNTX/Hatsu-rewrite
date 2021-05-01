'use strict'
//Database Model
const prefix = require('./models/Prefix');
const warn = require('./models/Warn Data');

/* Loggers */
const logs = require('../logger/logger');
const debugLogs = logs.getLogger('HatsuDebug');
const errorLogs = logs.getLogger("HatsuError");

class sendData {
    async setPrefix(newPrefix, GuildID, GuildName) {
        this.prefix = newPrefix;
        this.guild = GuildID;
        this.guildName = GuildName;

        //Make Sure to Check if Prefix Length Is Not More than 3 Character
        if (this.prefix.length > 3) return {
            "Code": -4,
            "Message": "Prefix Character its Should Not More than 3 Character"
        }
        //OK This Part I'm Actually Lost What Iam Gonna do in this Scope

        //Find Guild ID from Prefix Model
        //If Found than Overwrite the Old Prefix Otherwise Make new Data with new Custom Prefix
        const guildData = await prefix.findOne({_id: this.guild});
        if (guildData) {
            debugLogs.debug(`Overwrite Prefix With New Prefix\n NewPrefix:${this.prefix}`);
            prefix.updateOne({_id: this.guild}, {
                id_: this.guild,
                GuildName: this.guildName,
                GuildPrefix: this.prefix
            }, {strict: true}, err => {
                if (err) {
                    return {
                        "Code": -2,
                        "Message": `Failed to Overwrite Old Prefix with The New One, Reason:${err}`
                    }
                }
            })
        } else {
            debugLogs.debug(`Saving New Prefix\n NewPrefix:${this.prefix}`);
            try {
                await prefix.create({_id: this.guild, GuildName: this.guildName, GuildPrefix: this.prefix});
            } catch (err) {
                return {
                    "Code": -2,
                    "Message": `Failed to Save New Prefix Data, Reason:${err}`
                }
            }
        }
    }

    async setWarnData(GuildID, GuildName, UserID, Reason) {
        this.guild = GuildID;
        this.warnUser = UserID;
        this.warnReason = Reason;

        //Make Sure User is Input a The Warn User ID and The Reason
        if(!this.warnUser && !this.warnReason) return {
            Code: -15,
            Message: "Make sure You Input The Warn UserID With the Reason!"
        }
        //Get WarnData from Database With the GuildID
        const warnData = await warn.find({_id:this.guild});
        //If Hatsuku Found A Data that mean there is a User is Already Get Warn

        /**
         * Next Step:
         * Check if UserId is Match With the New UserId (in this case is user getting a warn)
         * if Match than add 1 point
         * else its mean that is a new User soo.. create a new one
         * Note:
         * Before Implement Step Above Wee Need to Check if that User is Reach the Warn Limit
         * if User is Already Reach First Limit Than Kick The User
         * or if User is Already Reach Final Limit Than Ban The User
         */

        if(warnData || !warnData) {
            if(warnData.WarnUserID === this.warnUser) {
                let warnCound = warnData.WarnUserCount
                let warnReason = warnData.WarnReason
                try {
                    warn.updateOne({_id: this.guild}, {
                        WarnReason: warnReason.push(this.warnReason),
                        WarnUserCount: warnCound++
                    });
                } catch (err) {
                    return  {
                        Code: -12,
                        Message: `Something Wrong When Try To Update A Data\n Reason:${err}`
                    }
                }
            } else if(!warnData && warnData.WarnUserID !== this.warnUser){
                try {
                    await warn.create({
                        _id: this.guild,
                        GuildName: GuildName,
                        WarnUserID: this.warnUser,
                        WarnReason: Array(this.warnReason),
                        WarnUserCount: 1
                    });
                } catch (err) {
                    return  {
                        Code: -12,
                        Message: `Something Wrong When Try To Update A Data\n Reason:${err}`
                    }
                }
            }
        }

    }

    async DeleteAllSaveData(GuildID) {
        this.guild = GuildID;
        //Like the Method Name Remove All Custom Data for Specific Guild
        //Very Useful If The Guild Owner Kick the Bot From Guild So No Data its Left Behind

        debugLogs.debug(`Removing All Data for GuildID:${this.guild}`);
        //Delete Prefix Data From Database
        prefix.deleteOne({_id: this.guild}, null, err => {
            if (err) return errorLogs.error(`Cannot Remove Prefix Data From Database!, Reason:${err}`);
        });
        warn.deleteOne({_id: this.guild}, null, err => {
            if (err) return errorLogs.error(`Cannot Remove Warn Data From Database!, Reason:${err}`)
        });
    }
}

module.exports = sendData