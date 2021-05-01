//Import Some Stuff
const {Schema, model} = require('mongoose');

//Configure Document to Save to Database
const customPrefix = Schema({
    _id: String,
    GuildName: String,
    GuildPrefix: String
});

module.exports = model("CustomPrefix", customPrefix);