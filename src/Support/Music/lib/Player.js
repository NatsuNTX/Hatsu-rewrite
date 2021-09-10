const {hatsuLogger} = require('../../Logger');
const {HatsuEmbed} = require('../../Embeds');

class HatsuPlayer {
    /**
     * Hatsu Player Backend
     * @type Object Player Backend Properties
     * @param opts.client Discord Client
     * @param opts.player Shoukaku Player
     * @param opts.guild Discord Guilds
     * @param opts.interactMessage Discord Interaction Message
     */
    constructor(opts) {
        this.client = opts.client;
        this.player = opts.player;
        this.guild = opts.guild;
        this.queue = [];
        this.isLoop = "off";
        this.nowPlay = null
        this.playerEmbed = []
        this.interactMessage = opts.interactMessage;
        this._playerEvent
    }

    get _playerEvent() {
        /* Shoukaku Start Events */
        this.player.on("start", (data) => {
            const plymsg = new HatsuEmbed({
                title: ":cd: Hatsu Player",
                thumbnail: {url: this.client.user.displayAvatarURL({size: 1024, format: "png"})},
                fields: [{
                    name: ":musical_note: Now Playing:",
                    value: this.nowPlay.info.title
                },
                    {
                        name: ":speaker: Volume:",
                        value: `${(this.player.filters.volume * 100).toFixed(2)}%`
                    }
                    /*
                    {
                        name: ":satellite: Music Server",
                        value: this.player.voiceConnection?.node.name
                    } */]
            });
            return this.interactMessage.channel.send({embeds: [plymsg]}).then(c => this.playerEmbed = c);
        });
        /* Shoukaku End Events */
        this.player.on("end", () => {
            this.interactMessage.channel.messages.delete(this.playerEmbed);
            if(!this.queue.length) {
                return this.destroyPlayer();
            } else {
                return this.playThatTracks();
            }
        });
        /* Shoukaku Update Events */
        this.player.on("update", (data) => {
            return hatsuLogger.debugLog("Hatsu Player", JSON.stringify(data, null, 3));
        });
        /* Shoukaku TrackError Events */
        this.player.on("exception", (reason) => {
            hatsuLogger.errorLog("Hatsu Player", `Error When Playing ${this.nowPlay.info.title} from ${this.guild.name} | ${this.guild.id}\n Reason:${reason}`);
            const trkerror = new HatsuEmbed({
                title: ":cd: Hatsu Player",
                description: "```Failed to Play that Track!,please try another tracks,\n " +
                    "If you still get this error please contact my Developer!```"
            });
            this.interactMessage.channel.send({embeds: [trkerror]}).then(c => {
                setTimeout(() => {
                    c.delete()
                },6000);
            });
        });
        /* Shoukaku Lib Error */
        this.player.on("error", error => {
            hatsuLogger.errorLog("Hatsu Player", `Internal Error Accoured!\n Error:${error}\n Music Player is Now Disable!`);
            const err = new HatsuEmbed({
                title: ":warning: Library Error",
                description: "```Opps... Something just F**k up!, you don't need to do anything i already send him a message\n " +
                    "for now i will disable the music command to prevent further error, iam so sorry :(```"
            });
            this.client.playerNode = -2
            return this.interactMessage.channel.send({embeds: [err]}).then(c => {
                setTimeout(() => {
                    c.delete()
                },6000);
            });
        });
    }

    get _isplaying() {
        return this.client.playermaps.get(this.guild.id);
    }

    async playThatTracks() {
        if (!this._isplaying || !this.queue.length) return //stop()
        this.nowPlay = this.queue.shift();
        await this.player.playTrack(this.nowPlay.track);
    }

    destroyPlayer(reason) {
        hatsuLogger.warnLog("Hatsu Player", `Destroying Hatsu Player From ${this.guild.name} | ${this.guild.id}`);
        this.queue.length = 0
        this.player.connection.disconnect()
        this.client.playermaps.delete(this.guild.id);
        if (reason) {
            const errmsg = new HatsuEmbed({
                title: "Error",
                description: "This is what people call ***Nothing is Perfect***\n " +
                    "You can try again but if you still get an error please report to my developer!"
            });
            return this.interactMessage.channel.send({embeds: [errmsg]}).then(c => {
                setTimeout(() => {
                    c.delete()
                },6000);
            });
        } else {
            const endmsg = new HatsuEmbed({
                title: "❤ Thank you!",
                description: "```Thank you for choosing me to play your favorite music!,\n" +
                    "if you have a problem when using me please don't hesitate to tell my developer to fix it, or if you have suggestion just tell him!```"
            });
            return this.interactMessage.channel.send({embeds: [endmsg]}).then(c => {
                setTimeout(() => {
                    c.delete()
                },6000);
            });
        }
    }
}
exports.HatsuPlayer = HatsuPlayer