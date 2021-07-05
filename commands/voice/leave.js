module.exports = {
  name: "leave",
  description: "Command to make the bot leave the voice channel.",
  execute(message) {
    const voiceChannel = message.member.voice.channel;
    if (voiceChannel) {
      voiceChannel.leave();
      message.channel.send(
        `woofBot has left voice channel: ${voiceChannel.name}!`
      );
    } else {
      message.channel.send("Please join a voice channel first!");
    }
  },
};
