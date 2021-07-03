module.exports = {
    name: 'hello',
    description: 'A hello message.',
    execute(message, args) {
        message.channel.send("Hello! I'm woofBot. Largely inspired by meowBot...")
    }
}