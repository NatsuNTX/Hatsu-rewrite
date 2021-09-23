const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Set the volume.")
        .addIntegerOption(options => options.setName("volume_level").setDescription("The lowest volume you can set is 5 and the highest volume is 500").setRequired(true)),
    async run(interaction) {
        await interaction.deferReply();
        const choices = interaction.options.getInteger("volume_level");
        await interaction.client.playermaps.playerControl.volumeTracks(interaction, choices);
    }
}