'use strict'
//Database Model
const admin = require('./models/admin');
const moderator = require('./models/moderator');

/* Loggers */
const logs = require('../logger/logger');
const infLogs = logs.getLogger('HatsuInfo');
const errLogs = logs.getLogger('HatsuError');
const warnLogs = logs.getLogger('HatsuWarn');
const debugLogs = logs.getLogger('HatsuDebug');

class sendData {
    async saveDefaultConfig(ownerID, GuildID, adminRoles, GuildNames) {
        this.owner = ownerID;
        this.guildId = GuildID;
        this.adminRole = adminRoles;
        this.serverName = GuildNames

        //Set Default Admin
        //Check if the Guild ID is Exist
        //if Exist than rewrite with the new one
        const guildInBase = await admin.findOne({GuildID:this.guildId});
        if(guildInBase) {
            warnLogs.warn('Found Guild ID in Database, Replacing With the New One');
            debugLogs.debug(`Saving Data to Database!\n Data:${JSON.stringify([this.ownerID, this.guildID, this.adminRole],null,2)}`);
            admin.deleteMany({GuildID: this.guildId}).catch(err => errLogs.error(`Failed to Remove Old Data from Database\n Reason:${err}`));
            const newData = admin({
                GuildID: this.guildId,
                GuildOwner:this.owner,
                GuildName: this.serverName,
                AdminRoles: this.adminRole
            });
            newData.save().then(dataInBase => {
                //console.log(dataInBase)
                if (dataInBase.GuildID === this.guildId) {
                    return infLogs.info("Successfully Save New Admin Config to Database!");
                } else if (dataInBase === '' || dataInBase.GuildID === '') return errLogs.error("Failed to Save Data to DataBase");
            })
        } else {
            const newData = admin({
                GuildID: this.guildId,
                GuildOwner:this.owner,
                GuildName: this.serverName,
                AdminRoles: this.adminRole
            });
            newData.save().then(dataInBase => {
                //console.log(dataInBase)
                if (dataInBase.GuildID === this.guildId) {
                    return infLogs.info("Successfully Save Admin Config to Database!");
                } else if (dataInBase === '' || dataInBase.GuildID === '') return errLogs.error("Failed to Save Data to DataBase");
            });
        }
    }
    deleteDataWhenLeave(GuildID) {
        this.guildID = GuildID;
        //Delete Admin Data
        admin.deleteMany({GuildID: this.guildID}, {}, (err) => {
            if (err) return errLogs.error(`Cannot Delete Admin Data From Database\n Reason:${err}`)
        });
        //Delete Moderator Data
        moderator.deleteMany({GuildID: this.guildID}, {}, (err) => {
            if (err) return errLogs.error(`Cannot Delete Moderator Data From Database\n Reason:${err}`)
        });
    }
}
module.exports = sendData