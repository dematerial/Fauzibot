const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config.json');


client.on('ready', () => {
  console.log('Bot fauzi siap gan!');
});


client.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.startsWith(config.prefix + "keyword")) {
    message.channel.send("WAJIB PAKAI PREFIX '!' SEBELUM PERINTAH DIBAWAH\n\nping = kalkulasi latency\nipk = show off ipk fauzi\nganteng = coba sendiri lah ya\nmukasaya = berkaca dulu gan");
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
});


client.login(process.env.BOT_TOKEN);
