module.exports = {
    name: 'bee',
    description: "Bee movie script, because why not",
    execute(message, args, cmd, client, Discord){
        message.channel.send('https://beemovie.fandom.com/wiki/Bee_Movie/Transcript');
    }
}