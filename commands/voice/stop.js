module.exports = {
    name: 'stop',
    description: 'Command to stop the bot\'s current stream.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            const dispatcher = message.client.dispatcher;
            dispatcher.destroy();
            message.channel.send('woofBot stopped the current song!');
        }
        else {
            message.channel.send("Please join a voice channel first!");
        }
    }
}