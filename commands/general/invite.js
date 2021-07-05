module.exports = {
  name: "invite",
  description: "Sends an invite for the bot.",
  execute(message) {
    const link =
      "https://discord.com/api/oauth2/authorize?client_id=860702426007994408&permissions=0&scope=bot";
    message.channel.send(`Invitation Link: ${link}`);
  },
};
