const {SlashCommandBuilder} = require('@discordjs/builders');
const {HatsuEmbed} = require('../../Support/Embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hi")
        .setDescription("Test Command Feedback"),
    async run(interaction) {
        const a = new HatsuEmbed({title: "TEST EMBED", description: "This is Description", thumbnail: {url:interaction.client.user.displayAvatarURL({size:1024})}});
        interaction.reply({embeds: [a]});
    }
}