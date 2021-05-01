//Stuff
const yt_api = require('simple-youtube-api');
const yt = new yt_api(process.env.YT_API);
const embed = require('../../Embed/NormalEmbed');
const { NOW_PLAYING_REACT } = require('../../../mastah/expression.json');

async function getVideoInfo(Youtube_Vid_Link, message, LavaPlayer) {
    this.ytlink = Youtube_Vid_Link;
    this.msg = message;
    this.lp = LavaPlayer;

    //Get Video Data from Youtube using Link and API
    const msgfirst = await this.msg.channel.send("***Getting Video Data,Please Wait...***");
    const vidData = await yt.getVideo(this.ytlink);
    try {
        msgfirst.edit('', { embed: new embed({
            title: `***Playing:${this.lp.currentTrack.info.title}***`,
            thumbnail: {url: vidData.thumbnails.maxres ? vidData.thumbnails.maxres.url : vidData.thumbnails.standard.url},
            fields: [
                {name: 'Title:', value: `${this.lp.currentTrack.info.title}`, inline: true},
                {name: 'Artis/Channel:', value: `${vidData.channel.title}`, inline: true},
                {
                    name: 'Track Length:',
                    value: `${vidData.duration.hours}` + `:` + `${vidData.duration.minutes}` + `:` + `${vidData.duration.seconds}`
                },
                {name:'Description:', value: `${Short(vidData.description, 1024)}`}
            ],
            image: {url: NOW_PLAYING_REACT}
        })});
    } catch (err) {
        msgfirst.edit(`***Something Wrong While Try to Get Video Data :(\n Error:${err}***`);
    }
}

function Short(text, MaxLength) {
    return((text.length > MaxLength) ? `${text.slice(0, MaxLength - 3)}...` : text);
}

module.exports = getVideoInfo