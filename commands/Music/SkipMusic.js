module.exports = {
    name: "skip",
    shortname: [""],
    description: "Stop Current Music and Go to the Next Music (if Any)",
    async execute(msg) {
        //Stop the Music
        await msg.client.playerControls.skipTracks(msg, msg.guild.id)
    }
}