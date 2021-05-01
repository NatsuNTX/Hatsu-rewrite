'use strict'

//Database Model
const prefix = require('./models/Prefix');
const warn = require('./models/Warn Data');

/* Loggers */
/*
const logs = require('../logger/logger');
const errLogs = logs.getLogger('HatsuError');
const warnLogs = logs.getLogger('HatsuWarn');
*/

class getData {
    async getPrefix(GuildID) {
        const prefixData = await prefix.findOne({_id:GuildID});
        if (!prefixData) return undefined
        return prefixData.GuildPrefix
    }
}
module.exports = getData;