const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "avatar", 
  alias: ["av"],
  category: "Utilidad",
  desc: "Revisa el avatar de un usuario ya esté dentro o fuera del servidor.",
  usage: "Despliega un menú de ayuda para cada usuario.", 
  userPerms: "",
  botPerms: "",

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args  
   */

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

     const member = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;

     const avatarembed = new MessageEmbed()

     .setAuthor(member.tag, member.avatarURL())   
     .setDescription(`<:Archivo_Documento:880826677335302154> [PNG](${member.avatarURL({ format: "png" })}) ┊ <:Archivo_Documento:880826677335302154> [JPG](${member.avatarURL({ format: "jpg" })}) ┊ <:Archivo_Documento:880826677335302154> [WEPB](${member.avatarURL({ format: "webp" })})`)
     .setImage(member.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }))
     .setFooter(member.id === message.member.id ? `Acá tu avatar ${member.username}` : `Avatar de ${member.username}`, member.displayAvatarURL())
     .setColor("WHITE")
     .setTimestamp()

     message.channel.send({ embeds: [avatarembed] }) 


 }

} 