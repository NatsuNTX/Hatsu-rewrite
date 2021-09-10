/* Stuff */
const {HatsuPlayer} = require('./Player');
const {PlayerControls} = require('./Controls/Player Controls');

/* Logger */
const {hatsuLogger} = require('../../Logger');

class HatsuPlayerMap extends Map {
    /**
     *
     * @param client Hatsu Client
     * @param opts Map module Options
     */
    constructor(client,opts) {
        super(opts);
        this.client = client;
        this.playerControl = new PlayerControls()
    }

    /**
     *
     * @param interaction Discord Interaction
     * @param nodes Shoukaku Nodes
     * @param tracks Shoukaku Tracks from Shoukaku Nodes Resolver
     * @returns {Promise<HatsuPlayer>}
     */
    async playerHandler(interaction, nodes,tracks) {
        this.interact = interaction;
        this.guild = interaction.guild;
        this.vc = interaction.member.voice.channel;
        const isplayerexists = this.get(this.guild.id);
        if(!isplayerexists) {
            const voiceNodes = await nodes.joinChannel({
                deaf:true, //I Dont Know why i set this but Remember HATSU IS NOT SAVE YOUR VOICE DATA!!!
                mute:false,
                shardId:this.guild.shardId,
                guildId:this.guild.id,
                channelId:this.vc.id
            });
            hatsuLogger.infoLog("Player Maps", `New Connection from ${this.guild.name} | ${this.guild.id}`);
            const hatsuPlayer = new HatsuPlayer({
                client:this.client,
                guild:this.guild,
                player:voiceNodes,
                interactMessage:this.interact
            });
            hatsuLogger.infoLog("Player Maps", `New Player has Spawn on ${this.guild.name} | ${this.guild.id}`);
            hatsuPlayer.queue.push(tracks);
            this.set(this.guild.id, hatsuPlayer);
            return hatsuPlayer;
        }
        isplayerexists.queue.push(tracks);
        return null
    }
}
exports.HatsuPlayerMap = HatsuPlayerMap