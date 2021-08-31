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
    .setTitle(`¡Hola! ${message.author.username}.`)
    .setDescription(`Soy **Police star** ando en matenimiento, mi prefix es \`p/\` y si necesitas ayuda usa \`p/menuhelp\`.`)
    .setTimestamp()
    .setColor("WHITE")
   
    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
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
    .setDescription(`<a:negativo:877943769083822111>┊El comando usado es **inexistente.**`)
    .setColor("RED")

    const holapeo = new Discord.MessageEmbed()
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