const nodemailer = require("nodemailer");
const {version} = require('../../../../package.json');

class HatsuMailer {
    constructor() {
        this.transport = nodemailer.createTransport({
            host: process.env.MAIL_SERVER,
            port: process.env.MAIL_PORT,
            secure: false, //If the Server use port 465 set it to true otherwise set it to false
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }
    async sendError(errorMessage, Guild, Date) {
        let msg = await this.transport.sendMail({
            from: `Hatsu | ${version} <${process.env.MAIL_USER}>`,
            to: process.env.DEV_EMAIL,
            subject: `Hatsu Got Fatal Error on ${Guild.id},Please Read this!`,
            text: "Hi!,I Got Fatal Error on one of my system, i already run save procedure so this error will not get\n" +
                "more worse than before, please read the error below this message!\n" + "\n" +
                `Date:${Date}\n` + `Guild Name:${Guild.name}\n` + `Guild ID:${Guild.id}\n` + `Hatsu Version:${version}\n` + "\n" + `Error Message:\n ${errorMessage}`
        });
        console.log("Message Send! " + `${msg.messageId}`);
        return msg.messageId
    }
}
exports.HatsuMailer = HatsuMailer