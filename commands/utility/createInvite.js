const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "createInvite", 
  alias: ["crear-inv"],
  category: "Utilidad.",
  desc: "Crea una invitación sin necesidad de crearla tú mismo.", 
  usage: "`<prefix>createInvite`",
  userPerms: "",
  botPerms: "Crear invitación instantánea.",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

async execute (client, message, args){

    const cooldownem = new Discord.MessageEmbed()
    .setDescription("<a:negativo:877943769083822111>┊**¡Cálmate!** espera 3s para volver a usar este **comando.**")
    .setColor("RED")
    
    if(cooldown.has(message.authorid)){
        message.channel.send({ embeds: [cooldownem] })

       return;
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 3000);

    if(!message.guild.me.permissions.has("CREATE_INSTANT_INVITE")){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊No tengo permiso de usar este **comando.**",
                color: "RED"
            }]
        })
    }

    const invitacion = await message.channel.createInvite({ maxAge: 0, reason: `Invitación creada por ${message.author.tag}` }).catch(() => null);
    if(!invitacion){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Ha ocurrido un error inesperado, vuelvelo a **intertar.**",
                color: "RED"
            }]
        })
    }

    message.channel.send({
        embeds: [{
            description: `<:add_invitaciones:883383585426518096>┊**Invitación:** ${invitacion.url}`,
            color: "GREEN"
        }]
    })

 }

} 

