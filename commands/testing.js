module.exports = {
    name: 'ping',
    description: "basic ping testing",
    execute(message, args, cmd, client, Discord){
        message.channel.send('Come on');
    }
}