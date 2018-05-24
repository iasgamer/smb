module.exports.run = async (bot, message, args) => {
    const Discord = require('discord.js');
    const fs = require('fs');
  if(message.author.id == "153163308801720321"){
          message.reply("Arrêt en cours..");
          console.log(`${bot.user.tag} arrêté.`);
          bot.destroy();
          process.exit()
      } else {
      message.reply("Pourquoi vouloir m'éteindre ?")
    }
}
module.exports.config = {
    command: "down"
}
