const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Send Your Last Message")
        .addStringOption(option => option.setName('input').setDescription('Enter a string')),
    async run(interaction) {
        interaction.reply("iisa")
        const a = interaction.options.getString('input')
        await interaction.followUp(a);
    }
}