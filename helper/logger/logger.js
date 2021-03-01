//Libs
const logger = require('log4js');
//Logs Settings
const {HatsuLogs} = require('./loggerConfig.json');

/* Keep it Simple */
const hatsuLogger = new logger.configure(HatsuLogs);

module.exports = hatsuLogger;