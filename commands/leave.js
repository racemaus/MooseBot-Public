module.exports = {
    name: 'leave',
    description: 'Bot leaves voice channel',
    async execute(message,args, cmd, client, Discord) {
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("Get in a voice channel you doofus..");

        await voiceChannel.leave();
        await message.channel.send("Goodbye fookers!");
    }
}