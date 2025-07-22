module.exports = {
    name:"saluda",
    descripcion:"Saluda",
    execute(mensaje, args){
       const user = mensaje.mentions.users.first()  || mensaje.author;
       mensaje.reply(`Holaaa <@${user.id}>`)
    }
}