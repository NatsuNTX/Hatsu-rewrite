/**
 * This is Where All Music Command do they Stuff
 * I Did this because to Make the Code inside Commands Files Short, cause the Old One
 * is Very Messy or Maybe i Always write messy code cuz i'm still beginner :P
 */
class PlayerControls {
    constructor(client) {
        this.client = client;
    }

    /**
     *
     * @param tracksOrUrl TrackName or Url
     * @param message Discord.js Message Module
     * @returns {Promise<Message|*>}
     */
    async playMusic(tracksOrUrl, message) {
        this.tracks = tracksOrUrl;
        this.msg = message;
        //Check if the User is Already in Voice Channel
        if (!this.msg.member.voice.channel) return this.msg.channel.send(`${this.msg.author}***You Need to Join to The Voice Channel First Before Running This Commands!***`);
        //if this.tracks is Empty meaning the User is Not Type Song Name
        if (!this.tracks) return this.msg.channel.send(`${this.msg.author}***What Song u Want me to Play?***`);

        //Function to Check if the User is Input a URL or Just a Title
        function isURL(url) {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        }

        //Get Lavalink Node
        const lavaNodes = this.client.playerNodes.getNode();

        //If User Input a URL
        if (isURL(this.tracks)) {

            //Change the Link to Lavalink Track Data
            const trackData = await lavaNodes.rest.resolve(this.tracks);
            if (!trackData) return this.msg.channel.send("I Can't Find Any Song From that Link");
            //Get Tracks, PlaylistName and Type
            const {playlistName, tracks, type} = trackData;

            const firstTracks = tracks.shift();

            const res = await this.client.playerHubs.playerHandle(this.msg, lavaNodes, firstTracks);

            //If it is a Playlist than Get All Trackdata from that Playlist than Put it In the Queue
            if (type === "PLAYLIST") {
                for (let trackList of tracks) await this.client.playerHubs.playerHandle(this.msg, lavaNodes, trackList);
            }
            await this.msg.channel.send(type === "PLAYLIST" ? `:white_check_mark: Added Playlist **${playlistName}** to the Queue!` : `:white_check_mark: Added **${firstTracks.info.title}** to the queue!`);
            //Play the Tracks
            if (res) return res.playTracks();
        } else {
            //Do i Need to Explain this code below?, because is Literally just a Same code as Above
            //but a little bit modification
            const trackData = await lavaNodes.rest.resolve(this.tracks, 'youtube');
            if (!trackData) return this.msg.channel.send("I Can't Find Any Song From that Link");
            const firstTracks = trackData.tracks.shift();
            const res = await this.client.playerHubs.playerHandle(this.msg, lavaNodes, firstTracks);
            await this.msg.channel.send(`:white_check_mark: Added **${firstTracks.info.title}**`);
            if (res) return res.playTracks();
        }
    }

    /**
     *
     * @param message Discord Message Module
     * @param guildID GuildID
     * @returns {Promise<*>}
     */
    async stopMusic(message, guildID) {
        this.msg = message;
        this.guild = guildID;

        //Check if the User is In the Voice Channel
        if (!this.msg.member.voice.channel) return this.msg.channel.send("You Need to Join VoiceChannel First Before Use this Commands!");
        //Get Player that Currently Playing from PlayerHUB
        const player = this.client.playerHubs.get(this.guild);
        //If Player is Not Spawn in that Guild than Refuse the Request
        if (!player) return this.msg.channel.send("I Can't Do That Because Nothing is Currently Playing");
        //if User is Execute this Command from Another VoiceChannel than Refuse it
        if (player.player.voiceConnection.voiceChannelID !== this.msg.member.voice.channelID) return this.msg.channel.send("**You Need to be In the Same Voice Channel!**");
        //Clear all Queue,Stop the Music and than Leave
        await this.msg.channel.send(`:stop_button:**Stopping Current Songs**`);
        player.queue.length = 0;
        await player.player.stopTrack();
    }

    /**
     *
     * @param message Discord Message Module
     * @param guildID GuildID
     * @returns {Promise<*>}
     */
    async skipTracks(message, guildID) {
        this.msg = message;
        this.guild = guildID;

        //Check if the User is In the Voice Channel
        if (!this.msg.member.voice.channel) return this.msg.channel.send("You Need to Join VoiceChannel First Before Use this Commands!");
        //Get Player that Currently Playing from PlayerHUB
        const player = this.client.playerHubs.get(this.guild);
        //If Player is Not Spawn in that Guild than Refuse the Request
        if (!player) return this.msg.channel.send("I Can't Do That Because Nothing is Currently Playing");
        //if User is Execute this Command from Another VoiceChannel than Refuse it
        if (player.player.voiceConnection.voiceChannelID !== this.msg.member.voice.channelID) return this.msg.channel.send("**You Need to be In the Same Voice Channel!**");
        //Stop the Current Track and Go to the Next Track
        await this.msg.channel.send("**Skipping..**");
        await player.player.stopTrack(); //just Stop and go to the next track Simple! (unless i got an error)
    }

    /**
     * For Some Reason its Cuz Earrape even if set to 10%
     * @param message Discord Message Module
     * @param guildID Discord Guild ID
     * @param volume Volume Numbers
     * @returns {Promise<Message>}
     */
    async musicVolume(message, guildID, volume) {
        this.msg = message
        this.guild = guildID;
        this.volume = volume;

        //Check if the User is In the Voice Channel
        if (!this.msg.member.voice.channel) return this.msg.channel.send("You Need to Join VoiceChannel First Before Use this Commands!");
        //Get Player that Currently Playing from PlayerHUB
        const player = this.client.playerHubs.get(this.guild);
        //If Player is Not Spawn in that Guild than Refuse the Request
        if (!player) return this.msg.channel.send("I Can't Do That Because Nothing is Currently Playing");
        //if User is Execute this Command from Another VoiceChannel than Refuse it
        if (player.player.voiceConnection.voiceChannelID !== this.msg.member.voice.channelID) return this.msg.channel.send("**You Need to be In the Same Voice Channel!**");
        //If User is Not Input a Number for Volume A.K.A just command say to input the Volume Numbers
        if (!this.volume || isNaN(this.volume)) return this.msg.channel.send("**Please Type 10 - 250 to Set Volume**");
        //Make Sure the Volume is Not to Low and to High
        if (this.volume < 10) return this.msg.channel.send("You Want to Mute me?");
        if (this.volume > 250) return this.msg.channel.send("Please Don't Earrape Someone :)");
        //Change it to Number
        const volumeInput = Number(this.volume);
        //Change it to Decimal Number
        const endVolume = volumeInput / 100;
        //Adjust the Volume
        await player.player.setVolume(endVolume);
        await this.msg.channel.send(`Set Volume to **${volumeInput}%**`);

    }

    async pauseMusic(message, guildID) {
        this.msg = message;
        this.guild = guildID;

        //Check if the User is In the Voice Channel
        if (!this.msg.member.voice.channel) return this.msg.channel.send("You Need to Join VoiceChannel First Before Use this Commands!");
        //Get Player that Currently Playing from PlayerHUB
        const player = this.client.playerHubs.get(this.guild);
        //If Player is Not Spawn in that Guild than Refuse the Request
        if (!player) return this.msg.channel.send("I Can't Do That Because Nothing is Currently Playing");
        //if User is Execute this Command from Another VoiceChannel than Refuse it
        if (player.player.voiceConnection.voiceChannelID !== this.msg.member.voice.channelID) return this.msg.channel.send("**You Need to be In the Same Voice Channel!**");
        //Check if Player is Already Pause or Not
        if (player.player.paused) return this.msg.channel.send("The Player is **Already Paused!**");
        //Paused the Current Track
        await player.player.setPaused(true);
        await this.msg.channel.send("Player is Now Paused!");
    }

    async resumeMusic(message, guildID) {
        this.msg = message;
        this.guild = guildID;

        //Check if the User is In the Voice Channel
        if (!this.msg.member.voice.channel) return this.msg.channel.send("You Need to Join VoiceChannel First Before Use this Commands!");
        //Get Player that Currently Playing from PlayerHUB
        const player = this.client.playerHubs.get(this.guild);
        //If Player is Not Spawn in that Guild than Refuse the Request
        if (!player) return this.msg.channel.send("I Can't Do That Because Nothing is Currently Playing");
        //if User is Execute this Command from Another VoiceChannel than Refuse it
        if (player.player.voiceConnection.voiceChannelID !== this.msg.member.voice.channelID) return this.msg.channel.send("**You Need to be In the Same Voice Channel!**");
        //Check if Player is Already Resume or Not
        if (!player.player.paused) return this.msg.channel.send("You Only can use this if the Player is Already Paused!");
        //Resume the Player
        await player.player.setPaused(false);
        await this.msg.channel.send("Resuming Current Song!");
    }

}

module.exports = PlayerControls