const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play Some Music For You")
        .addStringOption(option => option.setName("song").setDescription("Track Name or Link").setRequired(true)),
    async run(interaction) {
        await interaction.deferReply({ephemeral:true});
        const search = interaction.options.getString("song");
        await interaction.client.playermaps.playerControl.hatsuPlay(interaction,search);
    }
}