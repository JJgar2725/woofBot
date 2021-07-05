const fs = require("fs");
const discord = require("discord.js");
const dotenv = require("dotenv");

const client = new discord.Client(); // new client
dotenv.config(); // load in env
client.commands = new discord.Collection(); // collection class extended from maps
const commandFolders = fs.readdirSync("./commands");

client.dispatcher = {};

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

// on ready event
client.once("ready", () => {
  console.log("woofBot Up and Running!");
});

// on message event
client.on("message", (message) => {
  if (!message.content.startsWith(process.env.prefix) || message.author.bot)
    return;

  const args = message.content
    .slice(process.env.prefix.length)
    .trim()
    .split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.args && !args.length) {
    let reply = "You didn't provide the necessary arguments for this command!";

    if (command.usage) {
      reply += `\nThe proper usage for ${commandName} is: ${process.env.prefix}${command.name} ${command.usage}`;
    }

    return message.channel.send(reply);
  }

  try {
    command.execute(message, args, discord);
  } catch (error) {
    console.error(error);
    message.reply("There was an error trying to execute this!");
  }
});

// client login
client.login(process.env.TOKEN);
