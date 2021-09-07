const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const cooldown = new Set();

module.exports = {
  name: "ban", 
  alias: ["banear"],
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

    let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0]) || await client.users.fetch(args[0])
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

    const banembed = new Discord.MessageEmbed()
    
    .setAuthor("Sanción", `${message.author.displayAvatarURL({ dynamic: true })}`)
    .addField("Tipo:", `Ban`)
    .addField("Infractor:", `${mencionado.user.tag}`)
    .addField("Razón:", `${razon}`)
    .addField("Moderador:", `${message.author.tag}`)
    .setColor("RED")

    message.channel.send({ embeds: [banembed] })

 }

} 