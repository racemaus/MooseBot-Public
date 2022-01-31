const bannedlist = require("../../banned-words.json");
const bannedWords = bannedlist['banned-words'].map(word => word.toLowerCase());

module.exports = (Discord, client, message) => {
    const prefix = 'moose';

    
    //Checks if user sends a banned word 
    checkBadWord(message);

    //Checks prefix and bot issued messages to avoid unnecessary requests
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    //Splits message to prefix + content
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) ||
        client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    //Command executes if found
    try{
        command.execute(message, args, cmd, client, Discord);
    } catch (error){
        message.reply("There was an error trying to execute this command");
        console.log(error);
        console.log("These are the args: " + args);
    } 
}

//Better banned word check, credits: https://stackoverflow.com/a/60515612
const checkBadWord = (message) => {
    if((message.content.split(" ").filter(Set.prototype.has, new Set(bannedWords))).length > 0) {
        message.delete();
        return message.reply("said a bad word!!!!");
    }
}