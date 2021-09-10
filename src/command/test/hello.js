const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hi")
        .setDescription("Test Command Feedback"),
    async run(interaction) {
        interaction.reply("HI\n Did you like Neko?");
    }
}