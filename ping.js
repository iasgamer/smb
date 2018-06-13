module.exports.run = async (bot, message, args) => {
    const Discord = require('discord.js');
    const fs = require('fs');
    var ping_embed = new Discord.RichEmbed()
        .setAuthor("Spyer", bot.user.avatarURL)
        .setColor("E26302")
        .setFooter("Spyer | Développé par LePtitMetalleux", bot.user.avatarURL)
        .setTimestamp()
        .setDescription(`<:ping:456364525118029828> Temps de latence de Spyer : **${Math.round(bot.ping)}** ms
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
<:ping:456364525118029828> Temps de latence du serveur : **${Math.round(message.guild.ping)}** ms`)
        message.channel.send(ping_embed)
}
module.exports.config = {
    command: "ping"
}
