module.exports = {
    name: "paused",
    shortname: ["pause"],
    categories: "music",
    description: "Pause current Track",
    async execute(msg) {
        //Stop the Music
        await msg.client.playerControls.pauseMusic(msg, msg.guild.id)
    }
}