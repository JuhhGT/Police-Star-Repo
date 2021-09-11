const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const prefixes = new db.crearDB("prefixes");

const cooldown = new Set();

module.exports = async (client, message) => {

    if(!message.guild) return;
    let prefix;
    if(prefixes.tiene(message.guild.id)){
        prefix = await prefixes.obtener(message.guild.id)
    } else {
        prefix = 'p/'
    }

    const prefijo = await prefixes.obtener(message.guild.id);

    const embedmencion = new MessageEmbed()

    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`<:bot:867179899655421952> Hey **${message.author.username}**! ¿Como estás? Soy **Police Star**, el bot oficial de Team Star. Mi prefix es \`${prefijo}\` y mi menú de ayuda es \`${prefijo}menuhelp\`.\n\n<:azul:878981722102984705>  Actualmente me encuentro en **mantenimiento.**\n<a:owner_gif:884105748051808277> **Dueño del bot:** \`Adrián#0571\`.\n:man_technologist: **Desarrolladores:** \`Dymidless#0001\` \`luichi#0909\` \`Yuzz.#1926\`\n\n<:police_star:855811485531242496> Si tienes alguna queja, duda o reporte respecto al servidor háblame al MD.`)
    .setTimestamp()
    .setColor("BLURPLE")

   
    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {

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

        message.channel.send({ embeds: [embedmencion] })
    }
   
    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
    if(cmd){
    cmd.execute(client, message, args)
    }


    const embederr = new Discord.MessageEmbed()

    .setDescription(`<a:negativo:877943769083822111>┊El comando **${command}** es un comando **existente.**`)
    .setColor("RED")

    const rco = new Discord.MessageEmbed()

    .setDescription("<a:negativo:877943769083822111>┊No escribas repetitivamente comandos **incorrectos.**")
    .setColor("RED")

    
    if(!cmd){
        
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

        message.channel.send({ embeds: [embederr] })

  }

}