const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports = {
  name: "play",
  usage: "<youtube-search-term>",
  args: true,
  description: "Command to make the bot play music.",
  async execute(message, args, discord) {
    const voiceChannel = message.member.voice.channel;
    if (voiceChannel) {
      const search = args.join(" ");
      const results = await yts(search);
      const videos = results.videos.slice(0, 5);
      const firstVideo = videos[0];
      let url = firstVideo.url;
      let data = "";

      for (var i = 0; i < 5; i++) {
        const video = videos[i];
        data += `Option ${i + 1}: ${video.title} (${video.timestamp})\n`;
      }

      message.channel.send("First 5 Youtube Results\n" + data);

      // message.channel.send(data).then(sentMsg => {
      //     sentMsg.react("1️⃣");
      //     sentMsg.react("2️⃣");
      //     sentMsg.react("3️⃣");
      //     sentMsg.react("4️⃣");
      //     sentMsg.react("5️⃣");

      //     const filter = (reaction, user) => {
      //         return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
      //     };

      //     sentMsg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      //         .then(collected => {
      //             const reaction = collected.first();

      //             if (reaction.emoji.name === '1️⃣') {
      //                 url = videos[0].url;
      //             } else if (reaction.emoji.name === '2️⃣') {
      //                 url = videos[1].url;
      //             } else if (react.emoji.name === '3️⃣') {
      //                 url = videos[2].url;
      //             } else if (react.emoji.name === '4️⃣') {
      //                 url = videos[3].url;
      //             } else {
      //                 url = videos[4].url;
      //             }
      //         })
      //         .catch(collected => {
      //             message.reply('You reacted with something else!');
      //             console.log(test);
      //         });

      //     });

      voiceChannel.join().then((connection) => {
        const stream = ytdl(url, { filter: "audioonly" });
        message.client.dispatcher = connection.play(stream);

        const songEmbed = new discord.MessageEmbed()
          .setColor("#ffffff")
          .setTitle(`${firstVideo.title}`)
          .setURL(url)
          .setAuthor("Now Playing")
          .setDescription(`Duration: ${firstVideo.timestamp}`)
          .setImage(`${firstVideo.thumbnail}`)
          .setTimestamp();

        message.channel.send(songEmbed);
        console.log(`Now Streaming: ${firstVideo.title}`);
      });
    } else {
      message.channel.send("Please join a voice channel first!");
    }
  },
};
