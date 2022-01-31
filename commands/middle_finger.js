module.exports = {
    name: '1',
    description: "Nice middle finger",
    execute(message, args, cmd, client, Discord){
        message.channel.send(':middle_finger: :slight_smile: :middle_finger:');
    }
}