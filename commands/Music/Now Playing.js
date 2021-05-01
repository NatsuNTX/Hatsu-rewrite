module.exports = {
    name: "nowplay",
    shortname: ["np"],
    categories: "music",
    description: "See What is Currently Playing in the queue",
    async execute(msg) {
        await msg.client.playerControls.siteInfoPlayer(msg, msg.guild.id);
    }
}