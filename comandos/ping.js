module.exports.run = async (client, message, args) => {
   message.channel.send(`PONG ${client.ws.ping}`)
}

module.exports.help = {
   name: 'ping',
   aliases: [''],
   desc: 'Ver o ping do bot',
}

module.exports.config = {
   perm: 'SEND_MESSAGES',
   dev: false,
   cperm: 'SEND_MESSAGES'
}
