const discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

module.exports = {
    name: 'play',
    description: 'Command to make the bot play music.',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            const search = args.join(' ');
            const results = await yts(search);
            const videos = results.videos.slice(0, 5);
            const firstVideo = videos[0];
            const url = firstVideo.url;

            // console.log(firstVideo);
            
            voiceChannel.join().then(connection => {
                const stream = ytdl(url, { filter: 'audioonly' });
                const dispatcher = connection.play(stream);
                
                const songEmbed = new discord.MessageEmbed()
                .setColor('#ffffff')
                .setTitle(`${firstVideo.title}`)
                .setURL(url)
                .setAuthor("Now Playing")
                .setDescription(`Duration: ${firstVideo.timestamp}`)
                .setImage(`${firstVideo.thumbnail}`)
                .setTimestamp();

                message.channel.send(songEmbed);
            });
        }
        else {
            message.channel.send("Please join a voice channel first!");
        }
    }
}