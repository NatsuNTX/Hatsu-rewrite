//Libs
const {MessageEmbed} = require('discord.js');
const {version,name} = require('../../package.json');
const SelftHost = require('../../mastah/mastah_Config.json').OwnerConfig.MastahName

const ReadTextFile = require('read-text-file');
const profileLink = ReadTextFile.readSync('./ProfileLink.txt');

class hatsuEmbed extends MessageEmbed {
    constructor(props) {
        if (props) {
            props.color = props.color === undefined ? "RANDOM" : props.color;
            props.footer = props.footer === undefined ? {text: `${name} V${version} | Self Host by:${SelftHost}`, iconURL: profileLink} : props.footer
            super(props);
        } else {
            props = {
                color: "RANDOM",
                footer: {text: `${name} V${version} | Self Host by:${SelftHost}`, iconURL: profileLink}
            }
            super(props);
        }
    }

}
module.exports = hatsuEmbed