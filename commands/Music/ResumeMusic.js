module.exports = {
    name: "resume",
    categories: "music",
    description: "Resume current Track if the Player is On Paused State",
    async execute(msg) {
        //Stop the Music
        await msg.client.playerControls.resumeMusic(msg, msg.guild.id);
    }
}