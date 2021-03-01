const mongoose = require('mongoose');
const {exit} = require('process')
/* Logger */
const logs = require('../logger/logger');
const debuglog = logs.getLogger("HatsuDebug");
const errorlog = logs.getLogger("HatsuError");

function startDatabase() {
    this.dbLinks = process.env.DATABASE
    //Check if Database URI is Present in ".env" files
    if(this.dbLinks === undefined) {
        errorlog.error("Cannot Find Database URI, Please Put the Database URI in .env Files!");
        throw new Error ("Cannot Find Database URI, Please Put the Database URI in .env Files!");
    }
    //It is a Valid Mongodb URI?
    if(!this.dbLinks.includes("mongodb+srv")) {
        errorlog.error("Database URI is Not Valid!, Please Enter a Mongodb URI.");
        throw new Error ("Database URI is Not Valid!, Please Enter a Mongodb URI.");
    }
    mongoose.connect(this.dbLinks, {useNewUrlParser: true,
    useUnifiedTopology: true})
        .then(debuglog.debug("Connected to Database")).catch(err => {
            errorlog.error("Failed to Connect to Database: " + err);
            exit(65);
    });

}
module.exports = startDatabase;