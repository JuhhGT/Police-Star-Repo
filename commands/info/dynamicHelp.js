const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const prefixes = new db.crearDB('prefixes');
const { MessageButton } = require('discord.js')

const cooldown = new Set();

module.exports = {
  name: "help", 
  alias: [],
  category: "Información.",
  usage: "Ayuda sobre comandos, `p/help <Comandos>`",

  /** 
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

async execute (client, message, args){

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

    const data = []

    const name = args[0]
    if(!name){
        const prefix = await prefixes.obtener(message.guild.id)

        const mainembed = new Discord.MessageEmbed()
        
        .setTitle("Menú principal de ayuda de Police Star")
        .setDescription(`<:naturaleza:880835881173393408>┊Bienvenido al apartado de ayuda principal de **Police Star**. Si quieres información de un comando en especifico escribe: \`p/help <Comando>\`. En estos momentos estoy en mantenimiento pero para avanzar a los menús de soporte de cada sección dale click a los botones:`)
        .addField("<:informacion:812066315040587776>  Información", "Mira la lista de comandos sobre la informacion útil del bot.")
        .addField("<:martillo:879853908468576276>  Moderación", "Dale un vistazo a algunos comandos de moderación.")
        .addField("<:carpetas_del_servidor:880861378594865154>  Utilidad", "Mira los comandos útiles del bot, ya sea con algunos de mini-diversión.")
        .setColor("RANDOM")
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/877945642914304070/881306326804881418/banner-sc-2020-importante.png')
        .setFooter(`Panel de ayuda abierto por: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      
        const modembed = new Discord.MessageEmbed()
        
        .setAuthor("Moderación┊Police Star", 'https://cdn.discordapp.com/attachments/848744297192751104/854834953434038302/b89c8fb332d74e787470e896fe1c73ee.png')
        .setTitle("**Uso:** [Opcional] - <Obligatorio>")
        .setDescription("<:Global_Emojis:880858369966084126>┊Bienvenido al apartado de moderación de **Police Star**. Acá podrás encontrar gran variedad de comandos relacionados con respecto a la moderación.")
        .addField("Comandos", "`ban`, `clean`, `kick`, `mute`, `setmuterol`, `slowmode`, `unban`, `warn`")
        .setColor("RANDOM")
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/877945642914304070/881306495281668146/securitybanner.png')
        .setFooter(`Panel de moderación abierto por: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      
        const infoembed = new Discord.MessageEmbed()
        
        .setAuthor("Información┊Police Star", 'https://cdn.discordapp.com/attachments/848744297192751104/854834953434038302/b89c8fb332d74e787470e896fe1c73ee.png')
        .setTitle("Uso┊[Opcional] - <Obligatorio>")
        .setDescription("<:informacion:812066315040587776>┊Bienvenido al apartado de moderación de **Police Star**. Aquí podrás encontrar gran variedad de comandos relacionados con respecto a la información útil del bot.")
        .addField("Comandos", "`help`, `ping`, `uptime`")
        .setColor("RANDOM")
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/877945642914304070/881306368408190976/info-banner.png')
        .setFooter(`Panel de información abierto por: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      
        const utilembed = new Discord.MessageEmbed()
        
        .setAuthor("Utilidad┊Police Star", 'https://cdn.discordapp.com/attachments/848744297192751104/854834953434038302/b89c8fb332d74e787470e896fe1c73ee.png')
        .setTitle("Uso┊[Opcional] - <Obligatorio>")
        .setDescription("<:corazon:880835882855333968>┊Bienvenido al apartado de útilidad de **Police Star**. Aquí muchos comandos con respecto a la útilidad y mini-diversión del bot.")
        .addField("Comandos", "`avatar`, `set-prefix`, `suggest`, `user-info`, `server-info`, `user-info`")
        .setColor("RANDOM")
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/877945642914304070/881307090331791360/statistics_116490.png')
        .setFooter(`Panel de utilidad abierto por: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      
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
        if(args[0]) return;
        const filter = b => b.user.id === message.author.id;
        const collector = todo.channel.createMessageComponentCollector({ filter, time: 50000 });
      
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
      
        collector.on('end', async (b) => {
          todo.edit({
            embeds: [{
              description: "<a:negativo:877943769083822111>┊Tiempo acabado, vuelve a usar el **comando.**",
              color: "RED"
            }], 
      
            components: []
      
          })
        });
    }

    const prefix2 = await prefixes.obtener(message.guild.id)

    const Command = client.commands.get(name) || client.commands.find(x => x.alias && x.alias.includes(name));
    if(!Command){
        return
    }

    const embedito = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setFooter("Ayuda de Police Star", client.user.displayAvatarURL({ format: "png" }))
    .setTimestamp()
    .setColor("#c1a7ff")

    data.push({embeds: [embedito.addField(`**Nombre:**`, Command.name)]})
    if(Command.alias){
        data.push({embeds: [embedito.addField(`**Alias:**`, Command.alias.join(', ') || "Sin alias.")]})
    }

    data.push({embeds: [embedito.addField(`**Categoría:**`, Command.category || "Sin categoria.")]})
    data.push({embeds: [embedito.addField(`**Descripción:**`, Command.desc || "Sin descripcion.")]})
    data.push({embeds: [embedito.addField(`**Uso:**`, Command.usage || "Sin descripcion de uso.")]})
    data.push({embeds: [embedito.addField(`**Permisos requeridos:**`, Command.userPerms || "Todos los permisos.")]})
    data.push({embeds: [embedito.addField(`**Permisos del bot:**`, Command.botPerms || "Sin permisos requeridos.")]})

    message.channel.send({data, embeds: [embedito], split: true})

 }

} 