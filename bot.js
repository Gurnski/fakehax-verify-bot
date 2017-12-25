const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const botName = "Verify Bot";
//const song = connection.playFile("C:\Users\User\Desktop\Discord\bot1\tunes");
const blank = " ";
const bot = new Discord.Client();
const prefix = botSettings.prefix;
const MessageHandler = require('discord-message-handler');

var isReady = true;


console.log("[*]" ,botName, "is turning on. Please wait.");
console.log(blank);
console.log("[*] Current token:",botSettings.token);
console.log(blank);
console.log("[*] Current prefix:",botSettings.prefix);
console.log(blank);

bot.on("ready", async () => {
	bot.user.setGame("Use !!verify in #verify");
	console.log(blank);
	console.log(`[*] Bot ${bot.user.username} is now ready!`);

	try{
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		//console.log(blank);
		//console.log("[*]" ,link); //Remove the `//` to get the bot invite link via the console.
	} catch(e) {
		console.log(e.stack);
	}
});

bot.on('guildMemberAdd', member => {
	console.log("User "+member.user.username+" has joined the server. Setting Role to Unverified.")

	var startrole = member.guild.roles.Find('name', 'Unverified');
	member.addRole(startrole)
})

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;


	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1); 

	if(!command.startsWith(prefix)) return;

		if(command === `${prefix}verify`) {
			let owner = "<@230767452454256640>"
			let unVerrole = message.guild.roles.find(r => r.name === "Unverified");

			if(message.member.roles.has(unVerrole.id)) {
				message.reply("Verifying your HWID, please wait.")
				message.reply("Your HWID will be verified within the next 5 minutes!")

				let id = owner.replace(/[<@!>]/g, '');
				let hwid2 = (message.content).trim("!!")
				let hwid1 = (hwid2).trim("verify")
				let hwid = (hwid1).trim(" ")
				let channel = "<@394467868072214528>"

				let toVerify = message.author
				let role = message.guild.roles.find(r => r.name === "Verified");

				bot.fetchUser(id)
					.then(user => {user.send("User "+message.author+" with HWID "+hwid+" has requested to verify.")})
			}else{
				i = 0
				i + 1
				if (i == 2){
					message.channel.send("Stop spamming else I will lock chat.")
				}else{
					message.reply("DM <@230767452454256640> for a HWID reset.")
				}
				
			}
		}
		if(command === `${prefix}credits`) {
			message.channel.send("Developed by <@230767452454256640>")
		}
});

bot.login(botSettings.token);







