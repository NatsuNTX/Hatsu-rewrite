//Stuff
const playerSupport = require('./PlayerSupport');

/* Loggers */
const logs = require('../logger/logger');
const playerDebug = logs.getLogger("HatsuMusicDebug");
//const playerError = logs.getLogger("HatsuMusicError");
//const playerWarn = logs.getLogger("HatsuMusicWarn");
//const playerInfo = logs.getLogger("HatsuMusicInfo");

class playerHUB extends Map {
    /**
     *
     * @param client Bot Client
     * @param opts Map Options
     */
    constructor(client, opts) {
        super(opts);
        this.client = client;
    }

    /**
     *
     * @param msg Discord Message Modules
     * @param nodes Lavalink Server
     * @param tracks Track Data from Lavalink REST API
     * @returns {Promise<void>}
     */
    async playerHandle(msg, nodes, tracks) {
        this.message = msg
        this.guild = msg.guild
        this.voiceChannel = msg.member.voice.channel

        const isPlayerExist = this.get(msg.guild.id);
        //if No Player Found in the Guild than Spawn one
        if (!isPlayerExist) {
            playerDebug.debug("Spawn Player On:" + this.guild.name + " | " + this.guild.id);
            const player = await nodes.joinVoiceChannel({
                //Although Hatsuku Will NEVER record Anything from Voice Channel
                //but Lets keep it Deaf
                deaf: true,
                mute: false, //Don't set it to "True" unless You Know what you Doing :)
                guildID: this.guild.id,
                voiceChannelID: this.voiceChannel.id,
            });

            const musicPlayer = new playerSupport({
                client: this.client,
                guild: this.guild,
                textMessage: this.message.channel,
                userMessage: this.message,
                player
            });
            //Add Tracks to the Queue
            musicPlayer.queue.push(tracks);
            this.set(this.guild.id, musicPlayer);
            return musicPlayer;
        }
        isPlayerExist.queue.push(tracks);
        return null
    }

}

module.exports = playerHUB;