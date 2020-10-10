const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const client - new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.desc = new Discord.Collection();
client.perm = new Discord.Collection();
client.dev = new Discord.Collection();
client.cperm = new Discord.Collection();

fs.readdir('./comandos', (err, files) => { //ler a pasta de comandos
    if(err) return console.log(err) //se houver um erro,escrever no console
    let comando = files.filter(f => f.split(".").pop() == "js");
    comando.forEach((f, i) => {
      let props = require(`./comandos/${f}`);
      client.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
      client.desc.set(props.help.desc, props)
      });
    }); 
})

fs.readdir('./comandos', (err, files) => {
    if(err) return console.log(err) 
    let comando = files.filter(f => f.split(".").pop() == "js");
    comando.forEach((f, i) => {
      let obj = require(`./comandos/${f}`);
     client.perm.set(obj.config.perm, obj)
     client.cperm.set(obj.config.cperm, obj)
     client.dev.set(obj.config.dev, obj)
    }); 
})

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefixo = '!'
    
    var args = message.content.substring(prefixo.length).split(" ")
    
    if(!message.content.startsWith(prefixo)) return;
    let cmd = args.shift().toLowerCase()
    
    var command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd)) //procurar um comando com base no que o usuario escreveu
    if (!message.member.permissions.has(command.config.perm)) return message.reply(m.perms) //verificar as permissões do usuario
    if (!message.guild.me.permissions.has(command.config.cperm)) return message.reply(m.noperms + `${command.config.cperm}`)
    
    if(command) { try { 
        message.channel.startTyping();
        command.run(client, message, args);
        message.channel.stopTyping()
    } catch(e) { 
     console.log(`erro no comando ${cmd}`, e) 
     }
    } 
   }
})

client.run('seu token aqui blz?')
