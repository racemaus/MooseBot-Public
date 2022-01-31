const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

//Prefix and bot token from config.json
const {prefix, token} = require("./config.json");

['command-handler', 'event-handler'].forEach(handlers => {
    require(`./handlers/${handlers}`)(client, Discord);
})

//Client login last
client.login(token);