const { Message } = require("discord.js");

module.exports = {
  name: "info",
  descripcion: "brinda la informacion de un usario",
  execute(mensaje, args) {
    const user = mensaje.mentions.users.first()  || mensaje.author;
    const member = mensaje.mentions.members.first() || mensaje.member;
     const txt = args[0].toLowerCase();
    switch(txt){
      case "name": mensaje.reply(`Name: ${user.username}`) ; break;
      case "avatar": mensaje.reply(`Avtar: ${user.avatarURL()}`); break;
      case "id": mensaje.reply(`ID es: ${user.id}`); break;
      case "roles":
     const roles = member.roles.cache // Guardamos los roles en una variable
    .filter(role => role.name !== "@everyone") // filtramos rol por defecto
    .map(role => role.name) // crear array con los nombres del rol
    .join(", ") || "No tiene roles"; // verificar si hay o no un rol
     mensaje.reply(`Roles: ${roles}`);
      break;
      case "pending":
        const inicio = member.pending
        const decir = inicio ? `El estupido de <@${user.id}> paso por la pantalla de inicio` : `El estupido de <@${user.id}> no paso por la pantalla de inicio tremendo perdedor  :v`;
        mensaje.reply(decir)
      break;
      
    }
 
  }
}