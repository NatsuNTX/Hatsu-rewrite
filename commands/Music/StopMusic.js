module.exports = {
    name: "stop",
    shortname: [""],
    description: "Stop Music that Currently Play",
    async execute(msg) {
        //Stop the Music
        await msg.client.playerControls.stopMusic(msg, msg.guild.id);
    }
}