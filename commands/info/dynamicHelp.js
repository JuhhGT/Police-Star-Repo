const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

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

    if(!args[0]){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes colocar un comando, recuerda que para abrir el menú de ayuda debes ingresar `p/menuhelp`.",
                color: "RED"
            }]
        })
    }

    const name = args[0]
    const Command = client.commands.get(name) || client.commands.find(x => x.alias && x.alias.includes(name));
    if(!Command){
        return message.channel.send({
            content: "<a:negativo:877943769083822111>┊El comando escrito no **existe.**"
        })
    }

    const embedito = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setColor("#c1a7ff")
    .setFooter("Police Star help", client.user.displayAvatarURL({ format: "png" }))
    .setDescription("Apartado de ayuda sobre **comandos,** escribe `p/help <Comando>`.")
    .setTimestamp()

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