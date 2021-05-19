import * as Discord from 'discord.js';

const client = new Discord.Client();

/*
// Variables
let reminder: ReturnType<typeof setTimeout>;

function sendReminder(channel: Discord.TextChannel, mention: string, message: string) {
    channel.send(`${mention} ${message}`);
}


function parseReminderParams(text: string) {
    var messageString = text.slice(3).join(" ");
    console.log(messageString);

    return {
        mention: text[1],
        time: text[2] * 1000 * 60,
        message: messageString
    };
}
*/

function exec_ping(msg: Discord.Message) {
    msg.reply("pong");
}

function exec_thanks(msg: Discord.Message, mention: string) {
    if (mention == null) {
        msg.channel.send("Thank you!\n *psst!* Use a mention next time.");
    } else {
        msg.channel.send(`Thank you ${mention}!`);
    }
}

// Register callbacks

client!.on('ready', () => {
    if (client != null && client.user != null) {
        console.log(`Logged in as ${client.user.tag}`);
    }
});

client.on('message', msg => {
    if (msg.content.startsWith('$')) {
        const text = msg.content.split(" ");
        let command = text[0];
        console.log(command);

        if (command === "$ping") {
            exec_ping(msg);
        }

        if (command === "$thanks") {
            exec_thanks(msg, text[1]);
        }

        /*
        // $remind <Mention> <Time> <Message>
        if (command === '$remind') {
        var param = parseReminderParams(text) // in milliseconds
        if (isNaN(param.time) || param.time < 600) {
        msg.reply("Enter Time duration or I will go on a frenzy :) \n The syntax is as follows $remind <Mention> <Time> <Message>");
        }
        else {
        console.log(param.time);
        reminder = setInterval(sendReminder, param.time, msg.channel, param.mention, param.message);
        }

        }

        if (command === '$clear') {
        clearInterval(reminder);
        }

        if (command == '$remindonce') {
        var param = parseReminderParams(text);

        reminder = setTimeout(sendReminder, param.time, msg.channel, param.mention, param.message);
        }
         */
    }
});

// You'll need to keep the bot token as a Heroku env var
client.login(process.env["BOT_TOKEN"]);
