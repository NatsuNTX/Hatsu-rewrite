//Stuff
const axios = require('axios');
const form = require('form-data');
const {DiscordEndUsers} = require('./DiscordAPI.json');
const {version} = require('../../package.json');

/* Form Data */
const data = new form({encoding:"utf8"})

async function ScanConfig(Name,DiscordUserID) {
    this.mastah = Name;
    this.mastahID = DiscordUserID;
    /* Check the Configuration Files */
    //Check if Nothin is Empty in Mastah Config Files
    if (!this.mastah) throw new Error("ERROR:Cannot Run the Bot Because Mastah Name is EMPTY!");
    if (!this.mastahID) throw new Error("ERROR:Cannot Run the Bot Because Mastah ID is EMPTY!");
    //Make Sure is Correct Type
    if(typeof this.mastah !== "string") throw new Error('ERROR:Mastah Name is a Number!, Dont forget to Add this --> ("") ');
    if(typeof this.mastahID !== "string") throw new Error('ERROR:Please Input Your ID Like This ("33299113494922") To Avoid from Error!');
    //Make sure the id is in Correct Length
    if(this.mastahID.length > 18 || this.mastahID.length < 18) throw new Error("Please Make Sure You Input Correct DiscordID");
    //I need to Check the Discriminator too!
    if(!this.mastah.includes("#")) throw new Error("Hehem... Please Input Your Name Like This (Natsu#4455)");

    /* Checking */
    //HeaderConfig
    const HeaderConfig = {
        method: "GET",
        url: `${DiscordEndUsers}${this.mastahID}`,
        headers: {
            "Authorization": `Bot ${process.env.TOKEN}`,
            "User-Agent": `KIANA/${version} (CN:NTX-MEI, BOT:Hatsuku)`, //Custom UserAgent
            ...data.getHeaders()
        },
        data: data
    }
    /* This the Checking Happen */
    const response = await axios(HeaderConfig)
        switch (response.status) {
            case 200:
                if (this.mastah.includes(response.data.discriminator) && response.data.username === this.mastah.split('#')[0]) {
                    return response.data
                } else {
                    throw new Error("Hemm... the ID is Correct, but the Username is Not Match with the Data that i Have\n" + "Please Check the Name in Config File and Try Again!\n" + "Make Sure the Username and the Discriminator Number is Match with Your Discord Account");
                }
            case 404:
                throw new Error("Mastah~,are you try to Input Wrong ID? :)");
            case 401:
                throw new Error("Mastah~, Your Token is Wrong :(, Please Input Correct Discord Bot Token");
            default:
                throw new Error("Cannot Contact Discord Server!, Maybe is Down, Please Try Again Later");
        }

}
module.exports = ScanConfig;