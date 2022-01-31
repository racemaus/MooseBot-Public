//Example of how to use role specific commands
module.exports = {
    name: 'onlyfans',
    description: "testing role specific commands",
    execute(message, args, cmd, client, Discord){
        //Checks role
        //let role = message.guild.roles.cache.find(r => r.name === "Shrek");   //GUILD
        let role = message.member.roles.cache.some(r => r.name === "Shrek");    //MEMBER
        let userPermission = message.member.permissions.has('KICK_MEMBERS');

        //Role specific command
        if(role){
            message.channel.send("Here's Moose's OnlyFans: https://youtu.be/dQw4w9WgXcQ");
        } else {
            message.channel.send("Peasant, you won't see Mr Moose's funny pics");
        }

        //Has permission command
        if(userPermission){
            message.channel.send("You can give the boot");
        } else {
            message.channel.send("You can't give the boot");
        }
    }
}