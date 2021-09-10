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
        if (!this.interact.member.voice.channelId) return this.interact.editReply("You Need to Join to the Voice Channel First!", {ephemeral: true});
        if (!this.track) return this.interact.editReply("What song do you want me to play?", {ephemeral: true});
        switch (this.interact.client.playerNode) {
            case -1:
                await this.interact.editReply("Saddly...I Can't do that Right now because my Music server is Offline!");
                break;
            case -2:
                await this.interact.editReply("Music Command has been Disable due to internal Problem!");
                break;
        }
        const nodes = this.interact.client.shounodes.getNode();
        switch (itsurl(this.track)) {
            case true:
                const track = await nodes.rest.resolve(this.track);
                if (!track) return interaction.editReply("I Can't find A Song in that Link", {ephemeral: true});

                const firstTrack = track.tracks.shift();
                const playHandle = await this.interact.client.playermaps.playerHandler(this.interact, nodes, firstTrack);
                if (track.type === "PLAYLIST") {
                    for (let trackList of track.tracks) {
                        await this.interact.client.playermaps.playerHandler(this.interact, nodes, trackList);
                    }
                }
                await this.interact.editReply(track.type === "PLAYLIST" ? `:white_check_mark: Added Playlist **${track.playlistName}** to the Queue!` : `:white_check_mark: Added **${firstTrack.info.title}** to the queue!`, {ephemeral: true});
                await playHandle?.playThatTracks();
                break;
        }
    }
}
exports.PlayerControls = PlayerControls