const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config.json');

var InfiniteLoop = require('infinite-loop');
var il = new InfiniteLoop;

var quotes = config.quotes;
var prefix = config.prefix;

client.on('ready', () => {
  console.log('Bot fauzi siap gan!');
});

function randomQuote() {
	return quotes[Math.floor(Math.random() * quotes.length)];
};
il.add(randomQuote, []);

il.run();

client.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.startsWith(config.prefix + "keyword")) {
    message.channel.send("WAJIB PAKAI PREFIX '!' SEBELUM PERINTAH DIBAWAH\n\n" +
						             "ping = kalkulasi latency\n" +
						             "coinflip/cointoss = lempar koin gan\n" +
						             "roll = lempar dadu angka 1-100\n" +
						             "quote = kata-kata legendaris fauzi\n" +
						             "ipk = show off ipk fauzi\n" +
						             "ganteng = coba sendiri lah ya\n" +
						             "mukasaya = berkaca dulu gan");
  }
  if (message.content.startsWith(config.prefix + "ping")) {
    message.reply(new Date().getTime() - message.createdTimestamp + " ms latency");       
  }
  if (message.content.startsWith(config.prefix + "ipk")) {
    message.reply("ez 3.92 bosku");
  }
  if (message.content.startsWith(config.prefix + "mukasaya")) {
    message.reply(message.author.avatarURL);
  }
  if (message.content.startsWith(config.prefix + "ganteng")) {
    message.reply("Tampan dan Berani", {files: ["http://i65.tinypic.com/27y3ndx.jpg"]});
  }
  if (message.content.startsWith(config.prefix + "cointoss") || message.content.startsWith(config.prefix + "coinflip")) {
		var flip = Math.floor(Math.random() * 2 + 1);
		if (flip === 1) {
			message.reply("tails!");
		}
		else {
			message.reply("heads!");
  }}
  if (message.content.startsWith(config.prefix + "roll")) {
  		var result = Math.floor((Math.random() * 100) + 1);
  	message.reply("You rolled a: " + result);
  }
  if (message.content.startsWith(config.prefix + "quote")) {
    message.channel.send(randomQuote());
  }
});


client.login(process.env.BOT_TOKEN);
