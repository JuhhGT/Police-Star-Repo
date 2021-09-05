const Discord = require('discord.js');
const { MessageEmbed, MessageButton } = require('discord.js');
const db = require('megadb');
const prefixes = new db.crearDB("prefixes");

const cooldown = new Set();

module.exports = {
  name: "menuhelp", 
  alias: [],
  category: "Información",
  desc: "Despliega un menú de ayuda para cada usuario.",
  usage: "`p/menuhelp`",
  userPerms: "",
  botPerms: "",

async execute (client, message, args, prefix){

  const cooldownem = new Discord.MessageEmbed()
  .setDescription("<a:negativo:877943769083822111>┊**¡Cálmate!** espera 3s para volver a usar este **comando.**")
  .setColor("RED")
  
  if(cooldown.has(message.author.id)){
      message.channel.send({ embeds: [cooldownem] })

     return;
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
      cooldown.delete(message.author.id);
  }, 3000);

  if(args[0]) return;

  const mainembed = new Discord.MessageEmbed()
  
  .setAuthor("Team Star┊Police Star", 'https://cdn.discordapp.com/attachments/848744297192751104/854834953434038302/b89c8fb332d74e787470e896fe1c73ee.png')
  .setTitle("Menú ayuda┊[Opcional] - <Obligatorio>")
  .setDescription(`<:naturaleza:880835881173393408>┊Bienvenido al apartado de ayuda principal de **Police Star**, si quieres informacion de un comando en especifico escribe: \`${prefixes}help <Comando>\`, en estos momentos estoy en mantenimiento pero para avanzar a los menús de soporte de cada sección dale click a los botones:`)
  .addField("Información", "Mira la lista de comandos sobre la informacion útil del bot.")
  .addField("Moderación", "Dale un vistazo a algunos comandos de moderación.")
  .addField("Utilidad", "Mira los comandos útiles del bot, ya sea con algunos de mini-diversión.")
  .setColor("GREEN")
  .setThumbnail(`${client.user.displayAvatarURL()}`)
  .setTimestamp()
  .setImage('https://cdn.discordapp.com/attachments/877945642914304070/881306326804881418/banner-sc-2020-importante.png')
  .setFooter(`Panel ayuda abierto por: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)

  const modembed = new Discord.MessageEmbed()
  
  .setAuthor("Team Star┊Police Star", 'https://cdn.discordapp.com/attachments/848744297192751104/854834953434038302/b89c8fb332d74e787470e896fe1c73ee.png')
  .setTitle("Moderación┊[Opcional] - <Obligatorio>")
  .setDescription("<:Global_Emojis:880858369966084126>┊Bienvenido al apartado de moderación de **Police Star**, acá podrás encontrar gran variedad de comandos relacionados con respecto a la moderación, si necesitas ayuda sobre un comando usa: `p/help <comando>` y para volver al menú principal puedes presionar el botón **gris.**")
  .addField("Comandos", "`ban` `clean` `kick` `mute` `setmuterol` `slowmode` `unban` `warn`")
  .setColor("YELLOW")
  .setThumbnail(`${client.user.displayAvatarURL()}`)
  .setTimestamp()
  .setImage('https://cdn.discordapp.com/attachments/877945642914304070/881306495281668146/securitybanner.png')
  .setFooter(`Panel moderación abierto por: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)

  const infoembed = new Discord.MessageEmbed()
  
  .setAuthor("Team Star┊Police Star", 'https://cdn.discordapp.com/attachments/848744297192751104/854834953434038302/b89c8fb332d74e787470e896fe1c73ee.png')
  .setTitle("Información┊[Opcional] - <Obligatorio>")
  .setDescription("<:informacion:812066315040587776>┊Bienvenido al apartado de moderación de **Police Star**, acá podrás encontrar gran variedad de comandos relacionados con respecto a la información útil del bot, si necesitas ayuda sobre un comando usa: `p/help <comando>` y para volver al menú principal puedes presionar el botón **gris.**")
  .addField("Comandos", "`help` `ping` `uptime`")
  .setColor("BLUE")
  .setThumbnail(`${client.user.displayAvatarURL()}`)
  .setTimestamp()
  .setImage('https://cdn.discordapp.com/attachments/877945642914304070/881306368408190976/info-banner.png')
  .setFooter(`Panel información abierto por: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)

  const utilembed = new Discord.MessageEmbed()
  
  .setAuthor("Team Star┊Police Star", 'https://cdn.discordapp.com/attachments/848744297192751104/854834953434038302/b89c8fb332d74e787470e896fe1c73ee.png')
  .setTitle("Utilidad┊[Opcional] - <Obligatorio>")
  .setDescription("<:corazon:880835882855333968>┊Bienvenido al apartado de útilidad de **Police Star**, acá podrás encontrar gran variedad de comandos relacionados con respecto a la útilidad y mini-diversión del bot, si necesitas ayuda sobre un comando usa: `p/help <comando>` y para volver al menú principal puedes presionar el botón **gris.**")
  .addField("Comandos", "`avatar` `set-prefix` `suggest` `user-info`")
  .setColor("RED")
  .setThumbnail(`${client.user.displayAvatarURL()}`)
  .setTimestamp()
  .setImage('https://cdn.discordapp.com/attachments/877945642914304070/881307090331791360/statistics_116490.png')
  .setFooter(`Panel utilidad abierto por: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)

  const fila = new Discord.MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId('Modbutton')
    .setLabel('Moderación')
    .setStyle("PRIMARY")
    .setEmoji('<:ban:880826676211245107>'),

    new MessageButton()
    .setCustomId('Infobutton')
    .setLabel('Información')
    .setStyle("DANGER")
    .setEmoji('<:pins:880826679872864347>'),

    new MessageButton()
    .setCustomId("Utilbutton")
    .setLabel("Útilidad")
    .setStyle("SUCCESS")
    .setEmoji('<:gestion_clasificacion:880861466922741770>'),

    new MessageButton()
    .setCustomId('Mainbutton')
    .setLabel('Menú principal')
    .setStyle("SECONDARY")
    .setEmoji("<:gestion_factura:880861467891597353>")
  );

  let todo = await message.channel.send({ embeds: [mainembed], components: [fila] })
  const filter = b => b.user.id === message.author.id;
  const collector = todo.channel.createMessageComponentCollector({ filter, time: 300000 });

  collector.on('collect', async b => {
    if(b.customId === 'Modbutton'){
      await b.update({ embeds: [modembed], components: [fila] });
    }
    if(b.customId === 'Infobutton'){
      await b.update({ embeds: [infoembed], components: [fila] });
    }
    if(b.customId === 'Utilbutton'){
      await b.update({ embeds: [utilembed], components: [fila] })
    }
    if(b.customId === 'Mainbutton'){
      await b.update({ embeds: [mainembed], components: [fila] })
    }
  });

  collector.on('end', (b) => {
    todo.edit({
      embeds: [{
        description: "<a:negativo:877943769083822111>┊Tiempo acabado, vuelve a usar el **comando.**",
        color: "RED"
      }]
    })
  });

 }

} 