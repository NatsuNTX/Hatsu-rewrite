//Libs
const {promisify} = require('util');
const readDir = promisify(require('fs').readdir);
/* Logger Things */
const log = require('../logger/logger');

const debuglog = log.getLogger("HatsuDebug");
const errorlog = log.getLogger("HatsuError");


/**
 *
 * @param client Discord Bot Client
 * @constructor
 */
function LoadEvents(client) {
    /* Events Category */
    const category = ["guilds", "status"]

    category.forEach(categoryName => {
        readDir(`./events/${categoryName}`, (err, files) => {
            //Error Handling
            if (err) {
                errorlog.error(`Something Wrong With Events Handler!, ${err}`);
                throw new Error('Something Wrong With Events Handler!');
            }
            files.forEach(file => {
                //If No Files with Extension ".js" than Ignore that
                if (!file.endsWith(".js")) return;
                const eventCallback = require(`../../events/${categoryName}/${file}`);
                //Get Files Name
                const names = file.split(".")[0];
                //Run Events FIles
                client.on(names, eventCallback.bind(null, client));
                //Console
                debuglog.debug(`Loading Event:${names}`);
            });
        });
    });
}

module.exports = LoadEvents