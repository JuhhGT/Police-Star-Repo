const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "ban", 
  alias: ["banear"],
  category: "Información",
  usage: "Despliega un menú de ayuda para cada usuario.",

execute (client, message, args){

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

    let usuario = message.mentions.members.first();
    if(!usuario){
        message.channel.send({
            embeds: [{
              description: "<a:negativo:877943769083822111>┊Debes de **mencionar** a un usuario.",
              color: "RED"
            }]
          })
    
           return;
           
        }
    
    var razon = args.slice(1).join(' ')
    if(!razon){
        razon = 'No especificada.'
    }

    const permsrol = message.member.roles.cache.has('806239706785775677') || message.member.roles.cache.has('806239705703120937') || message.member.roles.cache.has('878044578127679498') || message.member.roles.cache.has('878044578127679498')
    if(!permsrol){
        message.channel.send({
            embeds: [{
              description: "<a:negativo:877943769083822111>┊No tienes los suficientes permisos para usar este comando.",
              color: "RED"
            }]
          })
    
           return;
           
        }

    usuario.ban({ reason: razon });
    //ta
    // Pueden hacer user.ban({ reason: razon }) btw, thx! || 👍

    const banembed = new Discord.MessageEmbed()
    
    .setAuthor(usuario.user.username, `${usuario.user.displayAvatarURL()}`)
    .setDescription(`<:baneado:875731740981878796>┊${usuario.user.tag} ha sido **baneado** exitosamente.`)
    .setThumbnail(`${usuario.user.displayAvatarURL({ dynamic: true })}`)
    .addField("ID:", `${usuario.id}`)
    .addField("Razón:", `${razon}`)
    .addField("Responsable de la acción:", `${message.author.tag}`)
    .setColor("BLUE")
    .setTimestamp()
    .setFooter("Moderacion Police Star", 'https://cdn.discordapp.com/attachments/848744297192751104/854834953434038302/b89c8fb332d74e787470e896fe1c73ee.png')

    message.channel.send({ embeds: [banembed] })

 }

} 