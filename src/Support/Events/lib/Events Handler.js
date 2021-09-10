/* Stuff */
const {readdirSync} = require('fs');
const {hatsuLogger} = require('../../Logger');

class HatsuEvent {
    constructor(client) {
        this.hatsu = client;
        this.loadEvents()
    }

    async loadEvents() {
        for(const mainDir of readdirSync('./src/events/', {withFileTypes:true})) {
            if(!mainDir.isDirectory()) continue;
            for(const file of readdirSync(`./src/events/${mainDir.name}/`, {withFileTypes:true})) {
                if(!file.isFile()) continue;
                const func = require(`../../../events/${mainDir.name}/${file.name}`);
                const type = func.events;
                const once = func.once;
                hatsuLogger.debugLog("Events", `Loading Event ${func.events}`);
                switch (once) {
                    case true:
                        this.hatsu.once(type, (...args) => {
                            func.run(...args)
                        });
                        break;
                    case false:
                        this.hatsu.on(type, (...args) => {
                            func.run(...args)
                        });
                        break;
                }
            }
        }
    }
}

module.exports = HatsuEvent