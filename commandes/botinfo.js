module.exports.run = async (bot, message, args) => {
const Discord = require('discord.js');
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
    var prefix = "*"

    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
  
  
  
    const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    var botinfo_embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Spyer", bot.user.avatarURL)  
    .setFooter("Spyer | Développé par LePtitMetalleux", bot.user.avatarURL)
    .setDescription(`Informations sur Spyer :

• Nom : <@422356073941434370>
• Créateur : <@153163308801720321>
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Préfix : ${prefix}
• Langage : JavaScript
• Version : 1.3.1
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Utilisation de la mémoire : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
• Temps en ligne : ${duration}
• Version Discord.js : v${version}
• Version Node : ${process.version}
• CPU  md${os.cpus().map(i => i.model)[0]}
• Utilisation du CPU : ${percent.toFixed(2)}%
• Système : ${os.arch()}
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Utilisateurs : ${bot.users.size.toLocaleString()}
• Serveurs : ${bot.guilds.size.toLocaleString()}
• Salons : ${bot.channels.size.toLocaleString()}`)
    .setTimestamp()
    .setThumbnail(bot.user.avatarURL)
    message.channel.send(botinfo_embed)
})}
module.exports.config = {
    command: "botinfo"
}