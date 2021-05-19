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

// https://stackoverflow.com/questions/63784594/how-do-i-add-roles-via-discord-js
async function exec_role(msg: Discord.Message, arg: string) {
    let member = msg.member;
    if (!member) {
        return msg.channel.send("Can't find the user in server");
    }

    let guild = msg.guild;
    if (!guild) {
        return msg.channel.send("Can't find the active server");
    }

    let role =
        guild.roles.cache.find((r) => r.name == arg) ||
        guild.roles.cache.find((r) => r.id == arg);
    if (!role) {
        return msg.channel.send("I couldn't find that role. Is the spelling correct?");
    }

    if (guild.me == null || !guild.me.hasPermission(["MANAGE_ROLES"])) {
        return msg.channel.send("I don't have the permissions to do this. Give me power Admins!");
    }

    if (member.roles != null && member.roles.cache.has(role.id)) {
        return msg.channel.send("You already have this role");
    } else {
        // TODO: Idk why this does not work. Trying to add a role higher than the bot's role should log
        // an error through the catch branch. But I still get the first branch. No role though, so this
        // is only an issue about reporting the right error.
        try {
            await member.roles.add(role.id).catch((e) => console.log(e));
            return msg.channel.send(`The role ${role.name} has been added to the user ${member.displayName}`);
        } catch (e) {
            console.error(e);
            return msg.channel.send("There was an issue adding the role. Ask the maintainer to check the logs.");
        }
    }
}

// Register callbacks

client!.on('ready', () => {
    if (client != null && client.user != null) {
        console.log(`Logged in as ${client.user.tag}`);
    }
});

client.on('message', async function (msg: Discord.Message) {
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

        if (command === "$role") {
            await exec_role(msg, text[1]);
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
