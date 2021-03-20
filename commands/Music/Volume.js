module.exports = {
    name: "volume",
    shortname: [""],
    description: "Set Volume of the Player",
    async execute(msg, userInput) {
        //Change the Volume
        await msg.client.playerControls.musicVolume(msg, msg.guild.id, userInput);
    }
}