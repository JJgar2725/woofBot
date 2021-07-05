module.exports = {
  name: "info",
  aliases: ["profile"],
  description: "Sends a message with the info of a given user.",
  async execute(message, args, discord) {
    const user = message.author;
    const guildMember = message.member;

    const userEmbed = new discord.MessageEmbed()
      .setColor("#ffffff")
      .setTitle(`User Information`)
      .setAuthor(user.username + "#" + user.discriminator)
      .setDescription(`Information about user: ${user.username}!`)
      .setThumbnail(`${user.displayAvatarURL()}`)
      .addFields(
        { name: "Username", value: `${user.username}`, inline: true },
        { name: "User ID", value: `${user.id}`, inline: true },
        { name: "Nickname", value: `${guildMember.nickname}`, inline: true },
        { name: "Date Joined", value: `${user.createdAt}` },
        { name: "Mention With", value: `${user.tag}` }
      )
      .setTimestamp();

    message.channel.send(userEmbed);
  },
};
