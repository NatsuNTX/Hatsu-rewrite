module.exports = {
    name: "skip",
    categories: "music",
    description: "Stop Current Music and Go to the Next Music (if Any)",
    async execute(msg) {
        //Stop the Music
        await msg.client.playerControls.skipTracks(msg, msg.guild.id)
    }
}