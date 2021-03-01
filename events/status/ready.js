/* Loggers */
const logs = require('../../helper/logger/logger');
const infolog = logs.getLogger("HatsuInfo");


module.exports = (client) => {
    infolog.info("Hatsu is Ready")
}