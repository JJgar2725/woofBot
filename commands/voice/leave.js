module.exports = {
    name: 'leave',
    description: 'Command to make the bot leave the voice channel.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            voiceChannel.leave();
        }
        else {
            message.channel.send("Please join a voice channel first!");
        }
    }
}