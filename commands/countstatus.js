const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let guild = bot.guilds.find(`id`, "410400562232819723")
let member = await guild.fetchMember(message.author.id)
if(!member) return;
if (member.roles.get("410608939139334184") //coowner
 || member.roles.get("410481036162760722")) { //owner 
if (bot.counter === false) {
bot.user.setActivity(`${bot.guilds.size} servers`, {type: "WATCHING"});
      message.react("\u2705")
      bot.counter = true
    } else if (bot.counter === true) {
            bot.user.setActivity("for !help", {type: "WATCHING"});
                message.react("\u2705")

      bot.counter = false
}
}


module.exports.help = {
    name: "countstatus"
}
