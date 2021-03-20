//Stuff Nyan~
const embed = require('../Embed/NormalEmbed');
const {playerEndMessage} = require('../../mastah/anotherConfig.json');

/* Loggers Keep it on Eyes */
const logs = require('../logger/logger');
const playerDebug = logs.getLogger("HatsuMusicDebug");
const playerError = logs.getLogger("HatsuMusicError");
const playerWarn = logs.getLogger("HatsuMusicWarn");
const playerInfo = logs.getLogger("HatsuMusicInfo");

class playerSupport {

    constructor(opts) {
        this.client = opts.client;
        this.queue = [];
        this.player = opts.player;
        this.guild = opts.guild;
        this.textMessage = opts.textMessage;
        this.userMessage = opts.userMessage;
        this.currentTrack = null;

        /* Player Start to Play */
        this.player.on("start", () => {
            playerInfo.info(`Now Playing:${this.currentTrack.info.title} | Requested [${this.userMessage.author.username}]`);
            const PlayerStartEmbed = new embed({
                title: ":cd: Music Player",
                thumbnail: {url: this.client.user.displayAvatarURL({size:1024,format:"webp"})},
                description: "Hatsu Music Player",
                fields:[{name:":musical_note: Now Playing:", value: `**${this.currentTrack.info.title}** [${this.userMessage.author}]`},
                    {name:":memo: Next Song:", value: `***${this.queue.length ? this.queue[0].info.title : "Opps.. i just see a dusk in this queue"}***`}],
                footer:{text: `Volume:${this.player.filters.volume * 100}% | MusicServer:${this.player.voiceConnection.node.name}`, iconURL: this.client.user.displayAvatarURL({size:1024,format:"webp"})}
            });
            this.textMessage.send(PlayerStartEmbed);
        });
        /* Player is Finish to Play */
        this.player.on("end", () => {
            this.playTracks().catch(err => {
                //if Something Happen Just Stop and Log it
                this.queue.length = 0;
                this.shutdownPlayer();
                playerError.error(`Something Wrong While Try to Play A Song!,${err}`);
            });
        });
        /* Can't Play the Next Track */
        this.player.on("trackException", (reason) => {
            const PlayerErrorEmbed = new embed({
                title: ":cd:Music Player",
                description: `Uh..o..ohh, Sorry ${this.userMessage.author} I Can't Play That Song for You Because I Found **a Error** White Try To Play it!, (╥﹏╥)`
            });
            this.textMessage.send(PlayerErrorEmbed);
            playerError.error(`Error on Media Player:${JSON.stringify(reason, null, 2)}`);
        });
        /* Just for Debugging */
        this.player.on("playerUpdate", (data) => {
            playerDebug.debug(`${JSON.stringify(data, null, 2)}`);
        });

        /* Do Something when Player get Error from closes,error,nodedisconnect */
        const errorEvent = ["closed", "nodeDisconnect", "error"];
        errorEvent.forEach(errEvent => {
            this.player.on(errEvent, errData => {
                if(errData instanceof Error || errData instanceof Object) playerError.error(errData);
                this.queue.length = 0 //Remove All Track from Queue
                this.shutdownPlayer();
            });
        });
}
/* Get Player ID if is Still Using By Another Guild */
    get stillPlaying() {
        return this.client.playerHubs.has(this.guild.id);
    }
    async playTracks() {
        //If the Hatsuku is Not in Any VoiceChannel or the queue is Empty than just Leave
        if(!this.stillPlaying || !this.queue.length) return this.shutdownPlayer()
        //get First Track from the Queue
        this.currentTrack = this.queue.shift();
        //Lastly Play the Track
        await this.player.playTrack(this.currentTrack.track);
    }
    shutdownPlayer() {
        playerWarn.warn(`Shutting Down Music Player from "${this.guild.name}" | ${this.guild.id}`);
        //Remove ALl Track from queue
        this.queue.length = 0;
        //Disconnect the Player and Remove the Guild ID From Node
        this.player.disconnect();
        this.client.playerHubs.delete(this.guild.id);
        //Send End Message
        this.textMessage.send(playerEndMessage);
    }

}
module.exports = playerSupport;