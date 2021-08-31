const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "user-info", 
  alias: ["info-usuario"], 
  category: "Información",
  usage: "Despliega un menú de ayuda para cada usuario.",

execute (client, message, args) {

     const cooldownem = new Discord.MessageEmbed()
     .setDescription("<a:negativo:877943769083822111>┊**¡Calmate!** espera 3s para volver a usar este **comando.**")
     .setColor("RED")
     
     if(cooldown.has(message.author.id)){
         message.channel.send({ embeds: [cooldownem] })
 
        return;
     }
 
     cooldown.add(message.author.id);
 
     setTimeout(() => {
         cooldown.delete(message.author.id);
     }, 3000);

     let usuario = message.mentions.members.first() || message.member;

     const embedinfo = new MessageEmbed()
     .setThumbnail(usuario.user.displayAvatarURL({ format: 'png', dynamic: 'true' }))
     .setDescription(`> **👤┊Información de ${usuario.user.username}**.`) 
     .addField("`🔗`", `${usuario.user.tag}`)
     .addField("`🆔`", `${usuario.user.id}`)
     .addField("`🎨`", usuario.roles.cache.map(roles => `${roles}`).join(' '))
     .addField("`🎬`", `${usuario.nickname !== null ? `${usuario.nickname}`: 'Sin apodo.'}`)
     .addField("`💵`", usuario.premiumSince ? 'Booster.' : 'No booster.')
     .setColor("WHITE")
     
     message.channel.send({ embeds: [embedinfo] })
     
}

} 