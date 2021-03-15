module.exports = {
    name: "hello",
    shortname: ["hi"],
    description: "Say FeedBack",
    execute(msg) {
        msg.reply("HI How are You?");
    }
}