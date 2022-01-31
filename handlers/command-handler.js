//Adds fs and dc collection for cleaner command structure
const fs = require('fs');

module.exports = (client, Discord) => {
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

    //loops through files inside commands folder
    for(const file of commandFiles){
        const command = require(`../commands/${file}`);
        
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}