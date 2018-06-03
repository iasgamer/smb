module.exports.run = async (bot, message, args) => {
    const Discord = require('discord.js');
    const fs = require('fs');
    var prefix = "."
    const translate = require('google-translate-api');
    const Langs = ['afrikaans','albanian','amharic','arabic','armenian','azerbaijani','bangla','basque','belarusian','bengali','bosnian','bulgarian','burmese','catalan','cebuano','chichewa','chinese simplified','chinese traditional','corsican','croatian','czech','danish','dutch','english','esperanto','estonian','filipino','finnish','french','frisian','galician','georgian','german','greek','gujarati','haitian creole','hausa','hawaiian','hebrew','hindi','hmong','hungarian','icelandic','igbo','indonesian','irish','italian','japanese','javanese','kannada','kazakh','khmer','korean','kurdish (kurmanji)','kyrgyz','lao','latin','latvian','lithuanian','luxembourgish','macedonian','malagasy','malay','malayalam','maltese','maori','marathi','mongolian','myanmar (burmese)','nepali','norwegian','nyanja','pashto','persian','polish','portugese','punjabi','romanian','russian','samoan','scottish gaelic','serbian','sesotho','shona','sindhi','sinhala','slovak','slovenian','somali','spanish','sundanese','swahili','swedish','tajik','tamil','telugu','thai','turkish','ukrainian','urdu','uzbek','vietnamese','welsh','xhosa','yiddish','yoruba','zulu'];
 if (args[1] === undefined) {
  
        return message.channel.send("**Merci d'indiquer un texte à traduire**");
  
      } else {
  
        let transArg = args[0].toLowerCase();
  
        args = args.join(' ').slice(prefix.length);
        let translation;
  
        if (!Langs.includes(transArg)) return message.channel.send(`**Langue inconnue**`);
        args = args.slice(transArg.length);
  
        translate(args, {to: transArg}).then(res => {
  
          const embed = new Discord.RichEmbed()
          .setDescription(res.text)
          .setColor(`E26302`)
          return message.channel.send(embed);
  
        });
  
      }
	}
module.exports.config = {
    command: "translate"
}