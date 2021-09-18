const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "lockdown",
  alias: [],
  category: "Moderación.",
  desc: "Bloquea un canal para que nadie pueda hablar.",
  usage: "`<prefix>lockdown [Canal]`",
  userPerms: "Administrador.",
  botPerms: "Gestionar Canales | Gestionar roles.",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

execute (client, message, args){

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

    message.delete()

    var permisos = message.member.permissions.has("ADMINISTRATOR");
    if(!permisos){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊No tienes permiso de usar el **comando.**",
                color: "RED"
            }]
        })
    }

    const todos = message.guild.roles.cache.find(
        peo => peo.name === '@everyone'
    );

    message.channel.permissionOverwrites.edit(todos, { SEND_MESSAGES: false })
    message.channel.send({
        embeds: [{
            description: "<a:afirmativo:877943896947191819>┊El canal fue bloqueado **correctamente.**",
            color: "GREEN"
        }]
    })

 }

} 

