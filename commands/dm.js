const Discord = require("discord.js");

module.exports.run = async (bot, message, args, content) => {
	if(message.author.id === "399975738008141824") {
		target = message.guild.members.find(member => member.user.tag.toLowerCase().startsWith(content) || member.user.id === args[0] || message.mentions.users.first() === member.user);
		if(target == null) {
			message.reply("Please specify a valid target.").catch(function() {});
		} else {
			target.user.send(content);
		}
	} else {
		message.reply("Only the creator of this bot can use this command.").catch(function() {});
	}
}
module.exports.help = {
	name: "dm"
}
