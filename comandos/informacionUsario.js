const { Message } = require("discord.js");
const { decrypt } = require("dotenv");

module.exports = {
  name: "info",
  descripcion: "brinda la informacion de un usario",
  execute(mensaje, args) {
    const user = mensaje.mentions.users.first() || mensaje.author;
    const member = mensaje.mentions.members.first() || mensaje.member;
    const txt = args[0].toLowerCase();
    switch (txt) {
      // ? user
      case "name": mensaje.reply(`Name: ${user.username}`); break;

      case "nameglobal": mensaje.reply(`Name Global: ${user.globalName}`); break;

      case "avatar": mensaje.reply(`Avtar: ${user.avatarURL()}`); break;

      case "id": mensaje.reply(`ID es: ${user.id}`); break;

      case "bot": 
       const isMemberBot = user.bot;
       const memberBot = isMemberBot ? `El usario  <@${user.id}> es un bot` : `El usario  <@${user.id}> no es un bot`;
       mensaje.reply(memberBot);
      break;

      case "baner": 
      //const isBanner = user.bannerURL({decrypt: true, size:2014})
      //const banner = isBanner ? isBanner : ` <@${user.id}>  no tiene baner 😹  😹  😹`
      const Isbanner = user.bannerURL({ dynamic: true, size: 1024 });
      const banner = Isbanner ? `El banner es: ${Isbanner}` : "NJK"
      mensaje.reply(banner)
      break;
    


      // ? MEMBER
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
