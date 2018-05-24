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

bot.login(process.env.TOKEN);
