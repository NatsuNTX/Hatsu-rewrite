const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("About Hatsuku"),
    async run(interaction) {
        interaction.reply({
            content: "HI... Iam Hatsuku, A Multipurpose Discord Bot written in JavaScript/Node.js\n " +
                "First Iam written in Python2 before switch to Nodejs, because my Developer [NatsuNTX] a little bit confuse about their documentation.\n " +
                "You may be see some wrong grammar due to my developer is not from western country, because english is not first language :(",
            ephemeral: true
        });
        await interaction.followUp({
            content: "Ohh i almost forget, by using me you agree to let me see ***what commands you execute,including the command options,\n " +
                "your guild name along with the ID***, Don't worry i **NEVER EVER** log your ***chat conversation or your voice data***",
            ephemeral: true
        });
    }
}