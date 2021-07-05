module.exports = {
  name: "github",
  description: "Sends the user a GitHub link to the project.",
  execute(message) {
    const github = "https://github.com/JJgar2725/woofBot";
    message.channel.send(`woofBot source code could be found at: ${github}`);
  },
};
