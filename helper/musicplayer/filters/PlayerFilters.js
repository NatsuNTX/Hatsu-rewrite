/**
 * This is Where Player Set a Filters
 * That's it!
 */
class playerFilters {
    constructor(client) {
        this.client = client;
    }

    /**
     * Use to Add More Punch on the BASS
     * @param level Bass Level ["low", "medium", "high", "ultra", "off"]
     * @param message Discord Message Module
     * @param guildID the GuildID that is Currently Using the Music Player
     * @returns {Promise<Message>}
     */
    async playerBassBoost(level, message, guildID) {
        this.bassLevel = level;
        this.msg = message;
        this.guild = guildID;

        //Check if the User is In the Voice Channel
        if (!this.msg.member.voice.channel) return this.msg.channel.send("You Need to Join VoiceChannel First Before Use this Commands!");
        //Check if Player is Still PlaySomething
        const player = this.client.playerHubs.get(this.guild);
        if(!player) return this.msg.channel.send("I Can't Do That Because Nothing is Currently Playing");
        //Make Sure is In The Same Voice Channel
        if (player.player.voiceConnection.voiceChannelID !== this.msg.member.voice.channelID) return this.msg.channel.send("**You Need to be In the Same Voice Channel!**");
        //Tell the User To Input Bass Level
        if(!this.bassLevel) return this.msg.channel.send("Please Select BassLevel do You want to Use ***[low,medium,high,ultra]*** type ***[off]*** to turn off this Filter").then(c => c.delete({timeout:50000}));
        //Set Bass Level According User Request
        const {low,medium,high,ultra,off} = require('./equalizer/bassboost_Config.json');
        //Convert From Array to String
        const bassLevel = String(this.bassLevel);
        switch (bassLevel.toLowerCase()) {
            case "low":
                await player.player.setEqualizer(low);
                this.msg.channel.send("BassLevel is now Set to **[LOW]**!").then(c => c.delete({timeout:10000}));
                break;
            case "medium":
                await player.player.setEqualizer(medium);
                this.msg.channel.send("BassLevel is now Set to **[MEDIUM]**!").then(c => c.delete({timeout:10000}));
                break;
            case "high":
                await player.player.setEqualizer(high);
                this.msg.channel.send("BassLevel is now Set to **[HIGH]**!").then(c => c.delete({timeout:10000}));
                break;
            case "ultra":
                await player.player.setEqualizer(ultra);
                this.msg.channel.send("BassLevel is now Set to **[ULTRA]**!").then(c => c.delete({timeout:10000}));
                break;
            case "off":
                await player.player.setEqualizer(off);
                this.msg.channel.send("***Turning Off BassBoost Effect.***").then(c => c.delete({timeout:10000}));
                break;
            default:
                return this.msg.channel.send("Please Select BassLevel do You want to Use ***[low,medium,high,ultra]*** type ***[off]*** to turn off this Filter").then(c => c.delete({timeout:50000}));
        }
    }

    /**
     * Change Playing Mode From Normal to Nightcore Until
     * Hatsuku is Complete Playing All Song or the User
     * is Stop the Music Player
     * @param message Discord Message Module
     * @param guildId GuildID that Currently Using the Player
     * @param onOrOff Mode [ON/OFF]
     * @returns {Promise<Message>}
     */
    async nightcoreMode(message, guildId, onOrOff) {
        this.msg = message;
        this.guild = guildId;
        this.power = onOrOff;

        //Check if the User is In the Voice Channel
        if (!this.msg.member.voice.channel) return this.msg.channel.send("You Need to Join VoiceChannel First Before Use this Commands!");
        //Check if Player is Still PlaySomething
        const player = this.client.playerHubs.get(this.guild);
        if (!player) return this.msg.channel.send("I Can't Do That Because Nothing is Currently Playing");
        //Make sure the User is in the Same Voice Channel as Hatsuku Join
        if (player.player.voiceConnection.voiceChannelID !== this.msg.member.voice.channelID) return this.msg.channel.send("**You Need to be In the Same Voice Channel!**");
        //Get Nightcore Config
        const {NC} = require('./nightcore/NC_Config.json');
        //Change from Array to String
        const mode = String(this.power);
        //Set the Player to NightCore Mode
        if(mode.toLowerCase() === "off") {
            await player.player.setTimescale({pitch:1.0,rate:1.0,speed:1.0});
            return this.msg.channel.send("Nightcore Mode is Now ***[OFF]***").then(c => c.delete({timeout:10000}));
        } else if (mode.toLowerCase() === "on"){
            await player.player.setTimescale(NC);
            return this.msg.channel.send("Nightcore Mode is now ***[ON]***").then(c => c.delete({timeout: 10000}));
        } else {
            return this.msg.channel.send("Please Type ***[ON]*** to Change Playing Mode to **NightCore** or Type ***[OFF]*** to Change Playing Mode to **Normal** \n" + "Note:Playing Mode will Reset to Normal After Hatsuku is Completed ***Playing All song in the Queue!***");
        }
    }
}
module.exports = playerFilters