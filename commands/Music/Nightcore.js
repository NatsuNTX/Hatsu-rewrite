module.exports = {
    name: "nightcore",
    shortname: ["nc"],
    description: "Change Playing mode from Normal to Nightcore Mode",
    async execute(msg, userInput) {
        //Change Mode to Nightcore
        await msg.client.playerFilters.nightcoreMode(msg,msg.guild.id,userInput);
    }
}