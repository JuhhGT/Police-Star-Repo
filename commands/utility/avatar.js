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

    if(args[1]) return;

     const user = message.mentions.users.first() || message.author;

     const avatar = new MessageEmbed()
     .setAuthor(`Avatar  de ${message.author.tag}`)
     .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
     .setDescription(`>:frame_photo: Formato de imagen :frame_photo:\n[PNG](${user.avatarURL({format: "png"})})\n[JPG](${user.avatarURL({format: "jpg"})})\n[WEBP](${user.avatarURL({format: 'webp'})})\n`)
     .setFooter(`Pedido por: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
     .setColor("RANDOM")
     message.channel.send({ embeds: [avatar] })


 }

} 