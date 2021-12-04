import * as Discord from 'discord.js';

//const Discord = require('discord.js');

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



const roles = [
    {id: 'programmer', name: 'Programmer'},
    {id: 'artist', name: 'Artist'},
    {id: 'design', name: 'Design'},
    {id: 'sound design', name: 'Sound Design'},
    {id: 'worldbuilding', name: 'Worldbuilding'},

    {id: 'y16', name: 'Y16'},
    {id: 'y17', name: 'Y17'},
    {id: 'y18', name: 'Y18'},
    {id: 'y19', name: 'Y19'},
    {id: 'y20', name: 'Y20'},
    {id: 'y21', name: 'Y21'}
];

/*

client.once('ready', () => {
    console.log("Kaka is online !");
});

*/



// UNCOMMENT THIS --------------------------------------------------------------------------------------------------//



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

    arg = arg.toLowerCase();
    let role_data = roles.find(c => c.id === arg);

    if(!role_data){
        if(arg[0]=='y') return msg.channel.send("Are you from IITK? If yes then reach out to the moderators to get your batch role added to the list.");
        else return msg.channel.send(`Hey first take a look at the available roles.`);
    }

    arg = role_data?.name;

    let member = msg.member;

    //msg.channel.send(`Giving ${member.displayName} the role ${arg}`);



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
            return msg.channel.send(`The role ${role.name} has been added to the user <@${msg.author.id}>`);
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




client.on('message', async function (msg: Discord.Message) {     //: Discord.Message

    //msg.channel.send("@Y19");

    if (msg.content.startsWith('$')) {
        const text = msg.content.split(" ");
        let command = text[0];
        //console.log(text);

        if (command === "$ping") {
            exec_ping(msg);
        }


        if (command === "$thanks") {
            exec_thanks(msg, text[1]);
        }


        if (command === "$role") {

            let str = text[1];

            if(text.length > 2){
                str = text.slice(1).join(" ");
            }
            await exec_role(msg, str);
            //msg.channel.send("Look who is asking for a role");
        }





// COMMENT FROM HERE -----------------------------------------------------------------------------------------------------------------//

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
// TILL HERE -------------------------------------------------------------------------------------------------------------------------//


    }

});




// You'll need to keep the bot token as a Heroku env var
client.login(process.env["BOT_TOKEN"]);
