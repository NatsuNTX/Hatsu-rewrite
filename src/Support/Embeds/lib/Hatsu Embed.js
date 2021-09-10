const {MessageEmbed} = require('discord.js');
const {name,version} = require('../../../../package.json');

class HatsuEmbed extends MessageEmbed {
    constructor(props) {
        if (props) {
            props.color = props.color === undefined ? "RANDOM" : props.color;
            props.footer = props.footer === undefined ? {text: `${name} V${version}`} : props.footer
            super(props);
        } else {
            props = {
                color: "RANDOM",
                footer: {text: `${name} V${version}`}
            }
            super(props);
        }
    }

}
exports.HatsuEmbed = HatsuEmbed