require('dotenv').config();
// ? Permite al desarrollador  interactuar con el sistema de archivos del sistema operativo
const fs = require('node:fs');
// ? Permite al desarrollador interectuar con rutas de archivos y directorios
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers

  ]
});


client.commands = new Collection();

const ComandosPath = path.join(__dirname, 'comandos');
const ComandosFiles = fs.readdirSync(ComandosPath).filter(file => file.endsWith('.js'));

for (const file of ComandosFiles) {
  const filePath = path.join(ComandosPath, file);
  const comando = require(filePath);

  if ('name' in comando && 'execute' in comando) {
    client.commands.set(comando.name, comando);
  } else {
    console.log(`⚠️ El comando en ${file} no tiene 'name' o 'execute'.`);
  }
}

client.on(Events.MessageCreate, message => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Asi no pendejo');
  }
});



client.login(process.env.TokenDelBot);
