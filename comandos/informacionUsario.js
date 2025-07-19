module.exports = {
  name: "info",
  descripcion: "brinda la informacion de un usario",
  execute(mensaje, args) {
    const user = mensaje.mentions.users.first() || mensaje.author;
     const txt = args[0].toLowerCase();
    switch(txt){
      case "name": mensaje.reply(`Nombre: ${user.username}`); break;
      case "avatar": mensaje.reply(`Avtar: ${user.avatarURL()}`); break;
      case "id": mensaje.reply(`ID es: ${user.id}`); break;
    }
 
  }
}