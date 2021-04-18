module.exports = {
    name: "play",
    categories: "music",
    description: "Play Music for You",
    async execute(msg, userInput) {
        let search = userInput.join(" ");
        //Play The Music
        await msg.client.playerControls.playMusic(search, msg);
    }
}