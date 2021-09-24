const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const autor = new db.crearDB('Autor');
const sugerencia = new db.crearDB('sugerencia');
const canalsuggest = new db.crearDB('canalsuggest');

const cooldown = new Set();

module.exports = {
  name: "sugerencia", 
  alias: [],
  category: "Información",
  usage: "Despliega un menú de ayuda para cada usuario.",

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

    const permisos = message.member.roles.cache.has('806239706785775677') || message.member.roles.cache.has('806239705703120937') || message.member.roles.cache.has('878044578127679498') || message.member.roles.cache.has('878044578127679498')
    if(!permisos){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊No tienes permiso para usar este **comando.**",
                color: "RED"
            }]
        })
    }

    const accion = args[0]
    if(!accion){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes ingresar una acción **(aprobar / denegar / potencial).**",
                color: "RED"
            }]
        })
    }

    const mensaje = args[1]
    if(!mensaje){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊Debes escribir la ID de la sugerencia.",
                color: "RED"
            }]
        })
    }

    if(!canalsuggest.tiene(message.guild.id)){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊El servidor no tiene ningún canal de sugerencias **establecido.**",
                color: "RED"
            }]
        })
    }

    const canal = await canalsuggest.obtener(message.guild.id)

    const sugerencias = await client.channels.cache.get(canal).messages.fetch(mensaje)
    if(!sugerencias){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊No se ha encontrado la **sugerencia.**",
                color: "RED"
            }]
        })
    }

    const persona = await autor.obtener(mensaje)
    const usuario = client.users.resolve(persona)
    if(!usuario){
        return message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊No se ha encontrado a la **persona.**",
                color: "RED"
            }]
        })
    }

    const contenido = await sugerencia.obtener(mensaje)

    if(accion.toLowerCase() === 'aprobar'){
        const aceptado = new MessageEmbed()
        .setFooter(`Sugerencia aprobada por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setTitle("Sugerencia aceptada.")
        .setDescription(`**Sugerencia:** ${contenido}`)
        .setColor("GREEN")

        sugerencias.edit({ embeds: [aceptado] })
        sugerencias.reactions.removeAll()
        message.channel.send({
            embeds: [{
                description: "<a:afirmativo:877943896947191819>┊La sugerencia ha sido **aprobada.**",
                color: "GREEN"
            }]
        })
        return;
    }

    if(accion.toLowerCase() === 'denegar'){
        var motivo = args.slice(2).join(' ')
        if(!motivo){
            motivo = 'No especificado.'
        }
        const rechazado = new MessageEmbed()
        .setDescription(`**Sugerencia:** ${contenido}`)
        .setColor("RED")
        .addField("Motivo", `${motivo}`)
        .setTimestamp()
        .setFooter(`Sugerencia denegada por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle("Sugerencia denegada.")
        sugerencias.edit({ embeds: [rechazado] })
        sugerencias.reactions.removeAll()
        message.channel.send({
            embeds: [{
                description: "<a:negativo:877943769083822111>┊La sugerencia ha sido **denegada.**",
                color: "RED"
            }]
        })
    }

    if(accion.toLowerCase() === 'potencial'){
        var razon = args.slice(2).join(' ')
        if(!razon){
            razon = 'No especificado.'
        }

        const potenciado = new MessageEmbed()
        .setTitle("Sugerencia en potencial.")
        .setDescription(`**Sugerencia:** ${contenido}`)
        .addField("Razón", `${razon}`)
        .setTimestamp()
        .setFooter(`Sugerencia gestionada por: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("ORANGE")
        sugerencias.edit({ embeds: [potenciado] })
        sugerencias.reactions.removeAll()
        message.channel.send({
            embeds: [{
                description: "<a:maybe:877943776855871518>┊La sugerencia ha sido tomada como **potencial.**",
                color: "#ffc500"
            }]
        })
    }

 }

} 