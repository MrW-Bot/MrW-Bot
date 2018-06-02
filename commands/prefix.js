module.exports.run = async (bot, message, args, oldprefix) => {
	if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have permission to use this command!");
	if (!args[0]) return message.reply(`My prefix is ${oldprefix}`);
	let prefix = args[0];
	if(prefix === "reset") {
		let aaa = dbguild.channels.filter(m => RegExp("wbotprefixes-database", "gi").test(m.name));
		aaa.forEach(chl => {
			chl.fetchMessages({ limit: 100 }).then(msgs => {
				msgs.forEach(msg => {
					if (msg.content.startsWith(`${message.guild.id}`)) {
						msg.delete();
					}
				});
			}).catch(function () { });
		});
		let prefixDB = bot.databases.prefixes.find(value => value.guild === message.guild.id);
		if (prefixDB != null) bot.databases.prefixes.splice(bot.databases.prefixes.indexOf(prefixDB), 1);
		bot.databases.prefixes.push({ guild: message.guild.id, prefix: "!!" });
		return message.react("\u2705");
	}
	if (prefix.length > 5) return message.reply("The prefix cannot be more than 5 characters!");
	let dbguild = bot.guilds.get("443929284411654144");
	let channel = dbguild.channels.find("name", "wbotprefixes-database");
	let messages = await channel.fetchMessages({ limit: 100 });
	let channels = dbguild.channels.filter(m => RegExp("wbotprefixes-database", "gi")
		.test(m.name));
	channels.forEach(chl => {
		chl.fetchMessages({ limit: 100 }).then(msgs => {
			msgs.forEach(msg => {
				if (msg.content.startsWith(`${message.guild.id}`)) {
					msg.delete();
				}
			});
		}).catch(function () { });
	});
	if (messages.size === 100) {
		await channel.setName("o-wbotprefixes-database");
		await dbguild.createChannel("wbotprefixes-database");
		let newc = dbguild.channels.find("name", "wbotprefixes-database");
		await newc.overwritePermissions(channel.guild.id, { READ_MESSAGES: false });
		await newc.setParent("443931006437949440");
		await newc.send(`${message.guild.id} ${prefix}`);
		let prefixDB = bot.databases.prefixes.find(value => value.guild === message.guild.id);
		if (prefixDB != null) bot.databases.prefixes.splice(bot.databases.prefixes.indexOf(prefixDB), 1);
		bot.databases.prefixes.push({ guild: message.guild.id, prefix: prefix });
		message.react("\u2705");
	} else {
		channel.send(`${message.guild.id} ${prefix}`);
		let prefixDB = bot.databases.prefixes.find(value => value.guild === message.guild.id);
		if (prefixDB != null) bot.databases.prefixes.splice(bot.databases.prefixes.indexOf(prefixDB), 1);
		bot.databases.prefixes.push({ guild: message.guild.id, prefix: prefix });
		message.react("\u2705");
		message.react("\u2705");
	}
};
module.exports.help = {
	name: "prefix",
	description: "Sets a new prefix for your server",
	type: "Miscellaneous"
};
