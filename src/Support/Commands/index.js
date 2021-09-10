const {RegisterSlashCommand} = require('./lib/Slash Register');
const {HatsuCommands} = require('./lib/Commands');
exports.registerSlashCommand = new RegisterSlashCommand()
exports.HatsuCommands = HatsuCommands;