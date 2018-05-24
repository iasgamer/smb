const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require('fs');
var bot = new Discord.Client();
var prefix = botconfig.prefix;

bot.commandes = new Discord.Collection();
fs.readdir('./commandes/', (err, files) => {
    if(err) console.error(err);

    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if(jsfiles.length <= 0) { return console.log("Aucune commande trouvée")}
    else { console.log(jsfiles.length + ' commandes trouvées.')}

    jsfiles.forEach((f, i) => {
        var cmds = require(`./commandes/${f}`);
        console.log(`Commande ${f} en cours de chargement`);
        bot.commandes.set(cmds.config.command, cmds);
    })

})

bot.on('message', message => {

    var cont = message.content.slice(prefix.length).split(" ");
    var args = cont.slice(1);
    
    if(!message.content.startsWith(prefix)) return;
    
    var cmd = bot.commandes.get(cont[0])
    if(cmd) cmd.run(bot, message, args);
    });
    
bot.on("ready", async () => {
    bot.user.setActivity(`Gérer le serveur | Aide ${bot.users.size} utilisateurs`, {type: `PLAYING`});
    console.log(`${bot.user.tag} connecté !`)
    });

bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "💬-général").send(`${member} a rejoint le serveur ! Bienvenue à toi !`)
    var role1 = member.guild.roles.find('name', '📢Notif-Bot');
    var role2 = member.guild.roles.find('name', '📢Notif-Serveur');
    var role3 = member.guild.roles.find('name', '📢Notif-Event');
    var role4 = member.guild.roles.find('name', 'Membres');
	member.addRole(role1)
	member.addRole(role2)
	member.addRole(role3)
	member.addRole(role4)
    });
//LOGS

bot.on("guildCreate", guild => {
    var gjoin_embed = new Discord.RichEmbed()
    .setAuthor("Spyer", bot.user.avatarURL)
    .setColor("96CA2D")
    .setFooter("Spyer | Développé par LePtitMetalleux", bot.user.avatarURL)
    .setThumbnail(guild.avatarURL)
    .setTimestamp()
    .setTitle(`Spyer a été ajouté à **${guild.name}**`)
    .setDescription(`ID : ${guild.id}
:family_mwgb: Membres : ${guild.memberCount} membres !`)
    bot.channels.find("id", "447664531636748298").send(gjoin_embed);
    bot.user.setActivity(`Gérer le serveur | Aide ${bot.users.size} utilisateurs`, {type: `PLAYING`});
  });
  
bot.on("guildDelete", guild => {
    var gleave_embed = new Discord.RichEmbed()
    .setAuthor("Spyer", bot.user.avatarURL)
    .setColor("96CA2D")
    .setFooter("Spyer | Développé par LePtitMetalleux", bot.user.avatarURL)
    .setThumbnail(guild.avatarURL)
    .setTimestamp()
    .setTitle(`Spyer a été retiré de **${guild.name}**`)
    .setDescription(`ID : ${guild.id}
:family_mwgb: Membres : ${guild.memberCount} membres !`)
    bot.channels.find("id", "447664531636748298").send(gleave_embed);
    bot.user.setActivity(`Gérer le serveur | Aide ${bot.users.size} utilisateurs`, {type: `PLAYING`});
  });

bot.on("guildMemberAdd", member => {
    var join_embed = new Discord.RichEmbed()
    .setAuthor("Spyer", bot.user.avatarURL)
    .setColor("96CA2D")
    .setFooter("Spyer | Développé par LePtitMetalleux", bot.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTimestamp()
    .setTitle(`Arrivée d'un nouveau membre !`)
    .setDescription(`${member.user.tag} vient d'arriver sur ${member.guild.name}
Nombre de membres après l'arrivée de ${member.user.tag} : ${member.guild.memberCount}`)
    member.guild.channels.find("name", "spyer-logs").send(join_embed)
    bot.user.setActivity(`Gérer le serveur | Aide ${bot.users.size} utilisateurs`, {type: `PLAYING`});
});

bot.on("guildMemberRemove", member => {
    var leave_embed = new Discord.RichEmbed()
    .setAuthor("Spyer", bot.user.avatarURL)
    .setColor("B9121B")
    .setFooter("Spyer | Développé par LePtitMetalleux", bot.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTimestamp()
    .setTitle(`Départ d'un membre`)
    .setDescription(`${member.user.tag} vient de partir de ${member.guild.name}
Nombre de membres après le départ de ${member.user.tag} : ${member.guild.memberCount}`)
    member.guild.channels.find("name", "spyer-logs").send(leave_embed);
    bot.user.setActivity(`Gérer le serveur | Aide ${bot.users.size} utilisateurs`, {type: `PLAYING`});
    });

bot.on("channelCreate", channel => {
    var channel_create_embed = new Discord.RichEmbed()
    .setAuthor("Spyer", bot.user.avatarURL)
    .setColor("96CA2D")
    .setFooter("Spyer | Développé par LePtitMetalleux", bot.user.avatarURL)
    .setTimestamp()
    .setTitle("Nouveau salon créé !")
    .setDescription(`Nom du salon : ${channel.name}
Nombre de salons après l'ajout du salon : ${channel.guild.channels.size}`)
    channel.guild.channels.find("name", "spyer-logs").send(channel_create_embed);
  });

bot.on("channelDelete", channel => {
    var channel_delete_embed = new Discord.RichEmbed()
    .setAuthor("Spyer", bot.user.avatarURL)
    .setColor("B9121B")
    .setFooter("Spyer | Développé par LePtitMetalleux", bot.user.avatarURL)
    .setTimestamp()
    .setTitle("Salon supprimé")
    .setDescription(`Nom du salon : ${channel.name}
Nombre de salons après la suppression du salon : ${channel.guild.channels.size}`)
    channel.guild.channels.find("name", "spyer-logs").send(channel_delete_embed);
    });

bot.on("roleCreate", role => {
    const rolec_embed = new Discord.RichEmbed()
    .setAuthor("Spyer", bot.user.avatarURL)
    .setColor("96CA2D")
    .setFooter("Spyer | Développé par LePtitMetalleux", bot.user.avatarURL)
    .setTimestamp()
    .setTitle("Un rôle a été crée !")
    .setDescription(`Nom du rôle : ${role.name}
Nombre de rôles après l'ajout du rôle ${role.name} : ${role.guild.roles.size}`)
    role.guild.channels.find("name", "spyer-logs").send(rolec_embed);
    });

bot.on("roleDelete", role => {
    var roled_embed = new Discord.RichEmbed()
    .setColor("B9121B")
    .setAuthor(bot.user.tag, bot.user.avatarURL)
    .setTitle("Un rôle a été supprimé")
    .setDescription(`Nom du rôle : ${role.name}
Nombre de rôles après la suppression du rôle ${role.name} : ${role.guild.roles.size}`)
    role.guild.channels.find("name", "spyer-logs").send(roled_embed);
    });

bot.on("messageUpdate", (oldMessage, newMessage) => {
    if(oldMessage.author.bot || oldMessage.cleanContent === newMessage.cleanContent) return;
    let msgup_embed = new Discord.RichEmbed()
    .setAuthor(newMessage.member.user.tag, newMessage.member.user.avatarURL)
    .setColor("FF5B2B")
    .setTitle(`Un message a été modifié !`)
    .setDescription(`Le message de ${newMessage.author.tag} a été modifié.
Ancien message : ``${oldMessage.cleanContent}``
Nouveau message : ``${newMessage.cleanContent}```)
    newMessage.guild.channels.find("name", "spyer-logs").send(msgup_embed);
    });

bot.on("messageDelete", (message) => {
    if (message.author.bot) return;
    let msgdel_embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor("B9121B")
    .setTitle("Un message a été supprimé !")
    .setDescription(`Le message de ${message.author.tag} a été supprimé.
Message Supprimé : `+``+ `${message.cleanContent}`+``)
    message.guild.channels.find("name", "spyer-logs").send(msgdel_embed);
  });
bot.login(process.env.TOKEN);
