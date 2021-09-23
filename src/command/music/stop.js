const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stop the Player"),
    async run(interaction) {
        await interaction.deferReply();
        await interaction.client.playermaps.playerControl.stopTracks(interaction);
    }
}