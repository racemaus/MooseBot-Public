module.exports = {
    name: 'shrek',
    description: "Shrek movie script, because why not",
    execute(message, args, cmd, client, Discord){
        message.channel.send('https://shrek.fandom.com/wiki/Shrek_(film)/Transcript');
    }
}