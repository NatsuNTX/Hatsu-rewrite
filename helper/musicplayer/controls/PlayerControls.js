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
            /*
            //If the Link is not From this Service that Mean they Try to Play Music from Another Link
            if (!this.tracks.includes(["youtube.com", "youtu.be", "soundcloud.com", "bandcamp.com", "twitch.tv"])) return this.msg.channel.send("Sorry., but for Now i Can Only Play Music from ***YouTube,SoundCloud,BandCamp and Twitch!***");
             */

            //Change the Link to Lavalink Track Data
            const trackData = await lavaNodes.rest.resolve(this.tracks);
            if (!trackData) return this.msg.channel.send("I Can't Find Any Song From that Link");
            //Get Tracks, PlaylistName and Type
            const {playlistName, tracks, type} = trackData;

            const firstTracks = tracks.shift();

            const res = await this.client.playerHubs.playerHandle(this.msg,lavaNodes, firstTracks);

            //If it is a Playlist than Get All Trackdata from that Playlist than Put it In the Queue
            if (type === "PLAYLIST") {
                for (let trackList of tracks) await this.client.playerHubs.playerHandle(this.msg, lavaNodes, trackList);
            }
            await this.msg.channel.send(type === "PLAYLIST" ? `:white_check_mark: Added Playlist **${playlistName}** to the Queue!` : `:white_check_mark: Added **${firstTracks.info.title}** to the queue!`);
            //Play the Tracks
            if (res) return res.playTracks();
        } else {
            const trackData = await lavaNodes.rest.resolve(this.tracks, 'youtube');
            if (!trackData) return this.msg.channel.send("I Can't Find Any Song From that Link");
            const firstTracks = trackData.tracks.shift();
            const res = await this.client.playerHubs.playerHandle(this.msg,lavaNodes, firstTracks);
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
        if(player.player.voiceConnection.voiceChannelID !== this.msg.member.voice.channelID) return this.msg.channel.send("**You Need to be In the Same Voice Channel!**");
        //Clear all Queue,Stop the Music and than Leave
        await this.msg.channel.send(`:stop_button:**Stopping Current Songs**`);
        player.queue.length = 0;
        await player.player.stopTrack();
    }
}
module.exports = PlayerControls