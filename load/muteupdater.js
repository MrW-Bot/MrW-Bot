module.exports.run = async (bot) => {
	bot.channels.get("443931383866458123").fetchMessages({ limit: 100 }).then(messagesFetched => {
		var muteGuild;
		var muteUser;
		var timeUntilUnmute;
		messagesFetched.forEach(msg => {
			if (msg.author.id === "419881218784493588") {
				muteGuild = bot.guilds.get(msg.content.split(" ")[0]);
				if (!muteGuild) return;
				muteUser = msg.content.split(" ")[1];
				timeUntilUnmute = parseInt(msg.content.split(" ")[2]);
				if (timeUntilUnmute <= Date.now()) {
					msg.delete().catch(function () { });
					muteGuild.members.get(muteUser).removeRole(muteGuild.roles.find("name", "Muted"));
				} else {
					setTimeout(() => {
						muteGuild.members.get(muteUser).removeRole(muteGuild.roles.find("name", "Muted"));
						msg.delete().catch(function () { });
					}, timeUntilUnmute - Date.now());
				}
			}
		});
	}).catch(function() {});
};
