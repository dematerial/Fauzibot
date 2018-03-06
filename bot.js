const Discord = require('discord.js');

const client = new Discord.Client();
const config = require('./config.json');
const weather = require('weather-js');
const sql = require("sqlite");
sql.open("./score.sqlite");
var InfiniteLoop = require('infinite-loop');
var il = new InfiniteLoop;

var quotes = config.quotes;
var images = config.images;
var prefix = config.prefix;

client.on('ready', () => {
  client.user.setActivity("with Lugas");
  console.log('Bot fauzi siap gan!');
});

function randomQuote() {
	return quotes[Math.floor(Math.random() * quotes.length)];
};
il.add(randomQuote, []);

function randomImage() {
	return images[Math.floor(Math.random() * images.length)];
};
il.add(randomImage, []);

il.run();

client.on('message', message => {
	let cont = message.content.slice(config.prefix.lenght).split(' ');
	let args = cont.slice(1);
	
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });

  if (message.content.startsWith(config.prefix + "level")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Your current level is 0");
      message.reply(`Your current level is ${row.level}`);
    });
  } else

  if (message.content.startsWith(config.prefix + "points")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("sadly you do not have any points yet!");
      message.reply(`you currently have ${row.points} points, good going!`);
    });
	}

  if (message.content.startsWith(config.prefix + "keyword")) {
    message.channel.send("WAJIB PAKAI PREFIX '!' SEBELUM PERINTAH DIBAWAH\n\n" +
						             "ping = kalkulasi latency\n" +
			 				     "weather <kota> = cek kondisi cuaca di kota tsb\n" +
						             "coinflip/cointoss = lempar koin gan\n" +
						             "roll = lempar dadu angka 1-100\n" +
						             "quote = kata-kata legendaris fauzi\n" +
						             "ipk = show off ipk fauzi\n" +
			 				     "senjata = request senjata\n" +
						             "ganteng = coba sendiri lah ya\n" +
			 				     "mukasaya = berkaca dulu gan\n" +
						             "command cek level bisa tanya @developers");
  }
  if (message.content.startsWith(config.prefix + "ping")) {
    message.reply(new Date().getTime() - message.createdTimestamp + " ms latency");       
  }
  if (message.content.startsWith(config.prefix + "ipk")) {
    const embed = new Discord.RichEmbed()
		.setDescription('Nama : Fauzi')
		.setAuthor('Obtained from Palawa')
		.setColor(0x00ff00)
		.addField('Isyarat dan Sistem', "A (4.00)", true)
		.addField('Sistem Mikroprosesor', "A (4.00)", true)
		.addField('Studium Generale', "A (4.00)", true)
		.addField('Jarkomdat', "A (4.00)", true)
		.addField('Matematika Diskret', "A- (3.75)", true)
		.addField('Prakt.Isyarat dan Sistem', "B (3.00)", true)
		.addField('Sistem Operasi', "A (4.00)", true)
		.addField('Teknik Basis Data', "A (4.00)", true)
		.addField('Teknik Pemodelan', "A (4.00)", true)
		.addField('Prakt.Teknik Basis Data', "A (4.00)", true)
    message.reply("ez 3.92 bosku");
    message.channel.send(embed);
  }
  if (message.content.startsWith(config.prefix + "senjata")) {
    message.reply("T A N P A  P E L U R U", {files: ["http://www.imfdb.org/images/d/db/PUBGTommyIcon.jpg"]});
  }
  if (message.content.startsWith(config.prefix + "mukasaya")) {
    message.reply(message.author.avatarURL);
  }
  if (message.content.startsWith(config.prefix + "ganteng")) {
    message.channel.send(randomImage());
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
  if (message.content.startsWith(config.prefix + "weather")) {
	weather.find({search: args.join(" "), degreeType: "C"}, function(err, result){
		if (err) message.channel.send(err);
		
		var current = result[0].current;
		var location = result[0].location;
		
		const embed = new Discord.RichEmbed()
		.setDescription(current.skytext)
		.setAuthor(current.observationpoint)
		.setThumbnail(current.imageUrl)
		.setColor(0x009fff)
		.addField('Timezone', "UTC-" + location.timezone, true)
		.addField('Degree Type',location.degreeType, true)
		.addField('Temperature',current.temperature + " C", true)
		.addField('Feels Like',current.feelslike + " C", true)
		.addField('Winds',current.winddisplay, true)
		.addField('Humidity',current.humidity + "%", true)
		
      message.channel.send({embed})
      })
  }
});


client.login(process.env.BOT_TOKEN);
