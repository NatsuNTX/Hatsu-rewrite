const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Loop the Current Song or All song in the queue.")
        .addStringOption(options => options.setName("loop_mode").setDescription("Loop Current Track or All Song")
            .setRequired(true).addChoice("current_track", "one").addChoice("all_queue", "all").addChoice("off", "off")),
    async run(interaction) {
        await interaction.deferReply({ephemeral: true});
        const choices = interaction.options.getString("loop_mode");
        await interaction.client.playermaps.playerControl.loopTracks(interaction, choices);
    }
}