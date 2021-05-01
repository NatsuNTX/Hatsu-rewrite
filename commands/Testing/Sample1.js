module.exports = {
    name: "hello",
    shortname: ["hi"],
    categories: "admin",
    description: "Say FeedBack",
    execute(msg) {
        msg.reply("HI How are You?");
    }
}