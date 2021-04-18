const {Schema, model} = require('mongoose');

const ModSchema = Schema({
    GuildID: String,
    modRoles: Array,
    CommandsAccess: {type: Object,default: {Moderator:true}}
});
module.exports = model("ModeratorConfig", ModSchema);
