module.exports = {
    name: "bassboost",
    shortname: ["bass"],
    description: "Add a Bass to the Song!",
    async execute(msg, userInput) {
        //Add a Bass Effect
        await msg.client.playerFilters.playerBassBoost(userInput,msg,msg.guild.id);
    }
}