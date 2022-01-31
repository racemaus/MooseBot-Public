module.exports = {
    name: 'help',
    description: "List of commands",
    execute(message, args, cmd, client, Discord){
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Command list -- moosehelp')
            .setURL('https://youtu.be/dQw4w9WgXcQ')
            .setDescription('Embedded list for commands')
            .addFields(
                {name: "help", value:"Shows this embed"},
                {name: "ping", value:"No"},
                {name: "saab", value:"Saab meme"},
                {name: "Shrek", value:"Links the Shrek movie script"},
                {name: "Bee", value:"Same for Bee Movie ^^"},
                {name: "fookjefe", value:"Shitty dosser"}
            )
            .setFooter("Be rood to Mr Moos");
           
            message.channel.send(newEmbed);
    }
    
}