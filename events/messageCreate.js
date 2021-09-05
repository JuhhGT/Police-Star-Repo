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
        prefix ='p/'
    }

    const embedmencion = new MessageEmbed()
    .setTitle(`¡Hola ${message.author.username}!`)
    .setDescription(`Soy **Police star**, el bot oficial de Team Star. Mi prefix es \`p/\` y mi menu de ayuda: \`p/menuhelp\`.\nActualmente estoy en mantenimiento.\n**CEO/DIRECTOR**: Adrián#0001\n\n**Desarrolladores**: Yuzzwn#0001, luichi#0909, Dymidless#0001**`)
    .setTimestamp()
    .setColor("RANDOM")
   
    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        message.channel.send({ embeds: [embedmencion] })
    }
   
    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
    if(cmd){
        if(!message.member.permissions.has(cmd.userPerms || [] )){
            return message.channel.send({
                embeds: [{
                    description: "<a:negativo:877943769083822111>┊No tienes permiso de usar el **comando.**",
                    color: "RED"
                }]
            })
        }
        if(!message.guild.me.permissions.has(cmd.botPerms || [])){
            return message.channel.send({
                description: "<a:negativo:877943769083822111>┊No tengo permisos para usar este **comando.**",
                color: "RED"
            })
        }
    cmd.execute(client, message, args)
    }

    const embederr = new Discord.MessageEmbed()
    .setDescription(`<a:negativo:877943769083822111>┊El comando usado es **inexistente.**`)
    .setColor("RED")

    const rco = new Discord.MessageEmbed()
    .setDescription("<a:negativo:877943769083822111>┊No escribas repetitivamente comandos **incorrectos.**")
    .setColor("RED")
    
    if(!cmd){
        
        if(cooldown.has(message.author.id)){
            message.channel.send({
                embeds: [{
                    description: "<a:negativo:877943769083822111>┊**¡Calmate!** espera 3s para volver a usar este **comando.**",
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