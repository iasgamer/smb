module.exports.run = async (bot, message, args) => {
  const Discord = require('discord.js');
  const fs = require('fs');
  var looked = message.mentions.users.first()
if(!looked){var looked = message.author}
if(looked.bot == true){
var checkbot = "Affirmatif"
} else {
var checkbot = "Négatif"
}
if(looked.presence.status = 'online') {
var etat = "En ligne"
}else { if (looked.presence.status = "dnd") {
var etat = "Ne pas déranger"
} else { if (looked.presence.status == "idle"){
    var etat = "Inactif"
} else { if (looked.presence.status == "streaming"){
    var etat = "En direct"
}
}}}
  var profil_embed = new Discord.RichEmbed()
    .setAuthor("Spyer", bot.user.avatarURL)
    .setColor("E26302")
    .setFooter("Spyer | Développé par LePtitMetalleux", bot.user.avatarURL)
    .setThumbnail(looked.avatarURL)
    .setDescription(`Profil de **${looked}**

**Pseudo :** ${looked.username}
**ID :** ${looked.id}
**Est-il un bot ?** ${checkbot}
**Statut :** ${etat}
**Joue à** ${looked.presence}
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ 
**A rejoint le serveur le** ${moment(looked.joinedAt).format("LL")}
**Surnom :** ${looked.nickname}
**Rôles :** ${looked.roles.filter(r => r.id !== message.guild.id).map(roles => roles.name)}
`)
    .setTimestamp()
  message.channel.send(profil_embed)
}
module.exports.config = {
  command: "profil"
}
