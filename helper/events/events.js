//Libs
const {promisify} = require('util');
const readDir = promisify(require('fs').readdir);


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
            if (err) throw new Error('Something Wrong With Events Handler!'); //Error Handling
            files.forEach(file => {
                //If No Files with Extension ".js" than Ignore that
                if (!file.endsWith(".js")) return;
                const events = require(`../../events/${categoryName}/${file}`);
                //Get Files Name
                const names = file.split(".")[0];
                //Run Events FIles
                client.on(names, events.bind(null, client));
                //Console
                console.log(`Loading Event:${names}`);
            });
        });
    });
}

module.exports = LoadEvents