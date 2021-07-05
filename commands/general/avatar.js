module.exports = {
  name: "avatar",
  description: "Sends a message with the avatar of a given user.",
  async execute(message, args, discord) {
    const user = message.author;

    const userEmbed = new discord.MessageEmbed()
      .setColor("#ffffff")
      .setTitle(`User Avatar`)
      .setAuthor(user.username + "#" + user.discriminator)
      .setImage(`${user.displayAvatarURL()}`)
      .setTimestamp();

    message.channel.send(userEmbed);
  },
};
