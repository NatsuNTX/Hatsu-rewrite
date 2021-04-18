module.exports = {
    name: "playspeed",
    shortname: ["speed"],
    categories: "music",
    description: "Change Player Speed",
    async execute(msg, userInput) {
        //Change Playback Speed
        await msg.client.playerFilters.changePlaybackSpeed(userInput, msg, msg.guild.id);
    }
}