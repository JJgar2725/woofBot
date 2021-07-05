module.exports = {
  name: "users",
  description: "Displays the amount of users on the guild.",
  execute(message) {
    const userAmount = message.guild.memberCount;
    message.channel.send(`Amount of Users: ${userAmount}`);
  },
};
