/* Get Client Class */
const hatsuku = require('./Hatsuku/main');
const {OwnerConfig} = require('./mastah/mastah_Config.json');
const Check = require('./helper/scanning/ScanMastahConfig');
const clr = require('chalk');
const getBotProfileLink = require('./getProfile');

// .env Files Config
require("dotenv").config()

/* Startup */
const logs = require('./helper/logger/logger');
const debug = logs.getLogger("HatsuDebug");

debug.debug("Starting Checking Mastah Configuration Files");
console.log(clr.cyan("Checking Mastah Config Files, Please Wait..."));
getBotProfileLink();
Check(OwnerConfig.MastahName,OwnerConfig.MastahDiscordID).then(data => {
    if (data) {
        debug.debug("Mastah UserData is Match With Discord User Data, Starting Hatsuku.");
        console.log(clr.cyan("Completed!,Mastah Files is Match with Discord UserData!\n" + `Welcome ${data.username}!`));
        new hatsuku({disableMentions:"everyone"}, process.env.TOKEN);
	}
})
