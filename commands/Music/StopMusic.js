module.exports = {
    name: "stop",
    categories: "music",
    description: "Stop Music that Currently Play",
    async execute(msg) {
        //Stop the Music
        await msg.client.playerControls.stopMusic(msg, msg.guild.id);
    }
}