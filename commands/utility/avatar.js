const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "avatar", 
  alias: ["avatar"],
  category: "Información",
  usage: "Despliega un menú de ayuda para cada usuario.",

async execute (client, message, args){

    if(cooldown.has(message.author.id)){
        message.channel.send({
            embeds: [{
              description: "<a:negativo:877943769083822111>┊**¡Cálmate!** espera 3s para volver a usar este **comando.**",
              color: "RED"
            }]
          })
    
           return;
           
        }
    
        cooldown.add(message.author.id);
    
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 3000);

     const user = message.mentions.users.first() || message.author

     let avatar = new MessageEmbed()
     .setColor("RANDOM")
     .setAuthor(`Avatar  de ${message.author.tag}`)
     .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
     .setDescription(`:frame_photo: [PNG](${user.avatarURL({format: "png"})})┊:frame_photo: [JPG](${user.avatarURL({format: "jpg"})})┊:frame_photo: [WEBP](${user.avatarURL({format: 'webp'})})`)
     .setFooter("Team Star | Police Star")
     message.channel.send({ embeds: [avatar] })

 }

} 