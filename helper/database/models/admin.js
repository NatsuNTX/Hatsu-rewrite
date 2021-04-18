const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    GuildID: String,
    GuildOwner: String,
    GuildName: String,
    AdminRoles: Array,
    CommandsAccess: {type: Object, default: {Admin: true, Moderator: true}},
});
module.exports = mongoose.model("AdminConfig", adminSchema);
