//Libs
const axios = require('axios');
const fs = require('fs');
const clr = require('chalk');

async function BotProfile(url) {
    this.proImage = url;

    const imageData = await axios({
        url: `${this.proImage}`,
        method: "GET",
        responseType: "stream"
    });
    const writeImage = fs.createWriteStream('BotProfile.png');

    imageData.data.pipe(writeImage);
    writeImage.on('finish', () => console.log(clr.green("Save Bot Profile!")));

}
module.exports = BotProfile;