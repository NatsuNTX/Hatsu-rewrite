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
    fs.writeFile('ProfileLink.txt', this.proImage, (err) => {
        if (err) throw new Error("Cannot Write Image Link!");
    });
    writeImage.on('finish', () => console.log(clr.green("Save Bot Profile!")));

}
module.exports = BotProfile;