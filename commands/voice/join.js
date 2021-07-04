module.exports = {
    name: 'join',
    description: 'Command to join the bot into a voice channel.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            const connection = voiceChannel.join();
            message.channel.send(`woofBot joined voice channel: ${voiceChannel.name}!`)
        }
        else {
            message.channel.send("Please join a voice channel first!");
        }
    }
}