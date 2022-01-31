const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();
// queue(message.guild.id, queueConstructor obj {vc, tc, conn, song[]})

const bannedlist = require("../banned-words.json");
//Banned list to lower case
const bannedArtist = bannedlist['banned-artists'].map(artist => artist.toLowerCase());

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'],
    description: 'DJ Moose',
    async execute(message, args, cmd, client, Discord){
        const voiceChannel = message.member.voice.channel;

        //Check if user is in voice channel && permissions
        if(!voiceChannel) return message.channel.send("Go to a voice channel you doofus");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) return message.channel.send("HAH you don't have the permissions");

        const serveQueue = queue.get(message.guild.id);

        if(cmd === 'play'){
            if(!args.length) return message.channel.send('Invalid arguments');

            //Checks for banned artist 
            if((args.filter(Set.prototype.has, new Set(bannedArtist))).length > 0) {
                return message.channel.send("How about no? :middle_finger: :slight_smile: :middle_finger:");
            }

            let song = {};

            if(ytdl.validateURL(args[0])){
                const songInfo = await ytdl.getInfo(args[0]);
                song = {title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url}
            } else {

                const videoFinder = async (query) =>{
                    const videoResult = await ytSearch(query);

                    //Return first video of video array if there's more than one result
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await videoFinder(args.join(' '));

                if(video){
                    song = {title: video.title, url: video.url};
                } else {
                    message.channel.send("Error finding video");
                }
            }

            if(!serveQueue){
                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    songs: []
                }
                queue.set(message.guild.id, queueConstructor);
                queueConstructor.songs.push(song);
    
                try {
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(message.guild, queueConstructor.songs[0]);
                } catch (error) {
                    queue.delete(message.guild.id);
                    message.channel.send("There was an error connection");
                    throw error;
                }
            } else {
                serveQueue.songs.push(song);
                return message.channel.send(`${song.title} added to queue`);
            }
        } 
        else if (cmd === 'skip') return skipSong(message, serveQueue);
        else if (cmd === 'stop') return stopSong(message, serveQueue);
    }
}

//Audio player
const videoPlayer = async(guild, song) => {
    const songQueue = queue.get(guild.id);

    if(!song){
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return
    }
    const stream = ytdl(song.url, {filter: 'audioonly'});
    songQueue.connection.play(stream, {seek: 0, volume: 1})
    .on('finish', () => {
        songQueue.songs.shift();
        videoPlayer(guild, songQueue.songs[0]);
    });

    await songQueue.textChannel.send(`:notes: Jamming to ${song.title}`);
}

const skipSong = (message, serveQueue) => {
    if(!message.member.voice.channel) return message.channel.send("You need to be in a channel to skip..");
    if(!serveQueue) return message.channel.send("No queued songs..");
    if(serveQueue.connection.dispatcher){
        serveQueue.connection.dispatcher.end();
    }
    
}

const stopSong = (message, serveQueue) => {
    if(!message.member.voice.channel) return message.channel.send("You need to be in a channel to stop..");
    if(!serveQueue) return message.channel.send("Nothing to stop..");
    else serveQueue.songs = [];
    
    if(serveQueue.connection.dispatcher){
        serveQueue.connection.dispatcher.end();
    }
}
