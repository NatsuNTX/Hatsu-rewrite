module.exports = {
    name: "hello",
    shortname: ["hi"],
    categories: "testing",
    description: "Say FeedBack",
    execute(msg) {
        msg.reply("HI How are You?");
    }
}