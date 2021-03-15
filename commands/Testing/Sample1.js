module.exports = {
    name: "hello",
    shortcut: ["hi"],
    description: "Say FeedBack",
    execute(msg) {
        msg.reply("HI How are You?");
    }
}