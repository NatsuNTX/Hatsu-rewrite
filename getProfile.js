//Stuff
const axios = require('axios');
const form = require('form-data');
const {DiscordEndUsers} = require('./helper/scanning/DiscordAPI.json');
const {version} = require('./package.json');
const fs = require('fs');

/* Form Data */
const data = new form({encoding:"utf8"})

function getBotProfile() {
    /* Its Just copy Paste from ScanMastahConfig with some edit
    * to Get Bot Profile Image and Bot Profile Image Link */
    const imageCdn = "https://cdn.discordapp.com/avatars/"
    const HeaderConfig = {
        method: "GET",
        url: `${DiscordEndUsers}@me`,
        headers: {
            "Authorization": `Bot ${process.env.TOKEN}`,
            "User-Agent": `KIANA/${version} (CN:NTX-MEI, BOT:Hatsuku)`, //Custom UserAgent
            ...data.getHeaders()
        },
        data: data
    }
    axios(HeaderConfig).then(response => {
        fs.writeFileSync('./ProfileLink.txt', `${imageCdn}${response.data.id}/${response.data.avatar}.png?size=1024`);
    });
}
module.exports = getBotProfile