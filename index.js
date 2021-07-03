const fs = require('fs');
const discord = require("discord.js");
const dotenv = require('dotenv');

const client = new discord.Client(); // new client
dotenv.config(); // load in env 
client.commands = new discord.Collection(); // collection class extended from maps
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// load in commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// on ready event
client.once('ready', () => {
    console.log("woofBot Up and Running!");
})

// on message event
client.on('message', (message) => {
    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

    const args = message.content.slice(process.env.prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute this!');
    }
});

// client login
client.login(process.env.TOKEN);