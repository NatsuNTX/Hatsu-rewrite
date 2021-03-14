//libs
const {promisify} = require('util');
const Readdir = promisify(require('fs').readdir);

/* Logger */
const logs = require('../../helper/logger/logger');
const debugLogs = logs.getLogger("HatsuDebug");
const errorLogs = logs.getLogger("HatsuError");

const category = ["status", "guilds", "etc"]

function loadEvents(client) {
    this.hatsuku = client;

    //Scan Directory to find Events Files!
    category.forEach(name => {
        Readdir(`./events/${name}/`, (err, files) => {
            //Error
            if (err) {
                errorLogs.error(`Error When Try to Scan Directory!, ${err}`);
                throw new Error(`Something Wrong When try to Scanning Directory!, ${err}`);
            }
            //Loop Each Files
            for (const eventsFiles of files) {
                //If Files is Not end with ".js" Ignore it
                if (!eventsFiles.endsWith('.js')) return;
                //We Require all Event Files in Events Directory
                const EventFunction = require(`../../events/${name}/${eventsFiles}`);

                //Clear Require Cache
                delete require.cache[eventsFiles]

                //Is EventFunction is Disable if it is than return without error
                if (EventFunction.disable) return;

                //Get Event Type (if No Event Type is Specified than use the Files Name)
                const EventType = EventFunction.event || eventsFiles.split('.');
                //Use to Send Event
                const emitter = (typeof EventFunction.emitter === 'string' ? this.hatsuku[EventFunction.emitter] : EventFunction.emitter) || this.hatsuku;
                //Check if Event is Only run Once or Not
                const once = EventFunction.once

                //We Use Try Catch Block if there is Something Wrong when try to Run the Events!
                try {
                    debugLogs.debug(`Loading Events:${eventsFiles.split('.')}`)
                    emitter[once ? 'once' : 'on'](EventType, (...args) => EventFunction.run(...args));
                } catch (e) {
                    errorLogs.error(`Error on Event Handler:${e}`);
                    throw new Error(`Opps... Error in EventHandler!, ${e}`);
                }
            }
        });
    });
}

module.exports = loadEvents