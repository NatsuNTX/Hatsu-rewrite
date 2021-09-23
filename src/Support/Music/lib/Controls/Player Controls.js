class PlayerControls {
    constructor() {
    }
    async hatsuPlay(interaction, search) {
        this.track = search;
        this.interact = interaction;

        const itsurl = (url) => {
            try {
                new URL(url);
                return true
            } catch {
                return false;
            }
        }

        if (!this.interact.member.voice.channelId) return this.interact.editReply("You Need to Join to the Voice Channel First!");
        if (!this.track) return this.interact.editReply("What song do you want me to play?");
        /* Make Sure the User is Not Execute it in different voice channel */
        const player = this.interact.client.playermaps.get(this.interact.guild.id);
        if(player && player.player.connection.channelId !== this.interact.member.voice.channelId) {
            return this.interact.editReply("You Need to be in the same Voice Channel to do that!");
        }
        switch (this.interact.client.playerNode) {
            case -1:
                await this.interact.editReply("Saddly...I Can't do that Right now because my Music server is Offline!");
                break
            case -2:
                await this.interact.editReply("Music Command has been Disable due to internal Problem!");
                break
        }
        const nodes = this.interact.client.shounodes.getNode();
        switch (itsurl(this.track)) {
            case true:
                const track = await nodes.rest.resolve(this.track);
                if (!track) return interaction.editReply("I Can't find A Song in that Link");

                const firstTrack = track.tracks.shift();
                const playHandle = await this.interact.client.playermaps.playerHandler(this.interact, nodes, firstTrack);
                if (track.type === "PLAYLIST") {
                    for (let trackList of track.tracks) {
                        await this.interact.client.playermaps.playerHandler(this.interact, nodes, trackList);
                    }
                }
                await this.interact.editReply(track.type === "PLAYLIST" ? `:white_check_mark: Added Playlist **${track.playlistName}** to the Queue!` : `:white_check_mark: Added **${firstTrack.info.title}** to the queue!`)
                await playHandle?.playThatTracks();
                break;
            case false:
                const track_name = await nodes.rest.resolve(this.track,"youtube");
                const first_track_name = track_name.tracks.shift();
                const playhandle = await this.interact.client.playermaps.playerHandler(interaction,nodes,first_track_name);
                await this.interact.editReply(`:white_check_mark: Added ${first_track_name.info.title} to the Queue`)
                playhandle?.playThatTracks();
                break;
        }
    }
    async loopTracks(interaction, mode) {
        this.interact = interaction;

        const p_maps = this.interact.client.playermaps.get(this.interact.guild.id);
        if(!p_maps) return this.interact.editReply("I Can't do that because nothing is currently playing!");
        if(p_maps.player.connection.channelId !== this.interact.member.voice.channelId) return this.interact.editReply("You need in the Same Voice Channel as me!");

        switch (mode) {
            case "one":
                if(mode === p_maps.isLoop) return this.interact.editReply("Is Already Looping Current track!");
                p_maps.isLoop = mode;
                await this.interact.editReply("Looping Current Track!");
                break
            case "all":
                if(mode === p_maps.isLoop) return this.interact.editReply("Is Already Looping All queue!");
                p_maps.isLoop = mode
                await this.interact.editReply("Looping All track in the queue!");
                break
            case "off":
                if(mode === p_maps.isLoop) return this.interact.editReply("The Loop Mode is Already Off!");
                p_maps.isLoop = mode
                await this.interact.editReply("Loop is now Off");
                break
        }
    }
    async volumeTracks(interaction, volume) {
        this.interact = interaction;
        const p_maps = this.interact.client.playermaps.get(this.interact.guild.id);
        if(!p_maps) return this.interact.editReply("I Can't do that because nothing is currently playing!");
        if(p_maps.player.connection.channelId !== this.interact.member.voice.channelId) return this.interact.editReply("You need in the Same Voice Channel as me!");

        if(volume < 5) return this.interact.editReply("You can use Mute Command to do that!");
        if(volume > 500) return this.interact.editReply("This is the Limit you can do Ear rape!");

        p_maps.player.setVolume((volume / 100));
        return this.interact.editReply(`Volume is now set to ${volume}%`);
    }
    async stopTracks(interaction) {
        this.interact = interaction;
        const p_maps = this.interact.client.playermaps.get(this.interact.guild.id);
        if(!p_maps) return this.interact.editReply("I Can't do that because nothing is currently playing!");
        if(p_maps.player.connection.channelId !== this.interact.member.voice.channelId) return this.interact.editReply("You need in the Same Voice Channel as me!");

        await this.interact.editReply(":stop_button: Stopping the Player");
        p_maps.isLoop = "off";
        p_maps.queue.length = 0
        return p_maps.player.stopTrack();
    }
}
exports.PlayerControls = PlayerControls