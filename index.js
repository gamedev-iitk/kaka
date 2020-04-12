// Importing required setup
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./_config.json');

// Variables
var reminder;

function sendReminder(channel, mention, message) {
    channel.send(`${mention} ${message}`);
}

function parseReminderParams(text) {
    var messageString = text.slice(3).join(" ");
    console.log(messageString);

    return {
        mention: text[1],
        time: text[2] * 1000 * 60,
        message: messageString
    };
}


// Register callbacks
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    if (msg.content.startsWith('$')) {
        const text = msg.content.split(" ");
        console.log(text);
        var command = text[0];
        console.log(command);

        if (command === '$ping') {
            msg.reply('pong');
        }

        // $remind <Mention> <Time> <Message>
        if (command === '$remind') {
            var param = parseReminderParams(text) // in milliseconds
            if(isNaN(param.time)||param.time<600){
                msg.reply("Enter Time duration or I will go on a frenzy :) \n The syntax is as follows $remind <Mention> <Time> <Message>");
            }
            else{
                console.log(param.time);
                reminder = setInterval(sendReminder, param.time, msg.channel, param.mention, param.message);
            }

        }

        if (command === '$clear') {
            clearInterval(reminder);
        }
        if(command == '$remindonce'){
            var param = parseReminderParams(text);
            
            reminder = setTimeout(sendReminder, param.time, msg.channel, param.mention, param.message);
        }
    }
});

client.login(config.token);
