module.exports = {
  name: "purge",
  description: "Deletes amount of messages passed in in args.",
  execute(message, args) {
    const msgsDeleted = parseInt(args[0]) + 1;
    message.channel.bulkDelete(msgsDeleted, true).catch((err) => {
      console.log(err);
      message.channel.send("Error purging!");
    });
  },
};
