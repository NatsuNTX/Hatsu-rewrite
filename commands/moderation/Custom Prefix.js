module.exports = {
    name: "prefix",
    //shortname: [""], Use This When You Found a Word for a Shortcut Otherwise Don't Use This
    categories: "moderation",
    description: "Set Custom Prefix For Your Guild!",
    async execute(msg, userInput) {
        await msg.client.botAction.setPrefix(userInput, msg);
    }
}