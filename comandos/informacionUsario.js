
module.exports = {
  name: "info",
  descripcion: "brinda la informacion de un usario",
  execute(mensaje, args) {
    const user = mensaje.mentions.users.first() || mensaje.author;
    const member = mensaje.mentions.members.first() || mensaje.member;
    if (!args[0]) {
      return mensaje.reply("Luego del comando inserta qué información quieres ver. Ejemplo: `!info name`");
    }
    const txt = args[0].toLowerCase();
    switch (txt) {
      // ? user
      case "name":
        const UserName = user.username
        mensaje.reply(`Name: ${UserName}`); break;
      case "nameglobal":
        const UserGlobal = user.globalName
        mensaje.reply(`Name Global: ${UserGlobal}`); break;

      case "avatar":
        const Avatar = user.avatarURL()
        mensaje.reply(`Avtar: ${Avatar}`); break;

      case "id":
        const id = user.id
        mensaje.reply(`ID es: ${id}`); break;

      case "bot":
        const isMemberBot = user.bot;
        const memberBot = isMemberBot ? `El usario  <@${user.id}> es un bot` : `El usario  <@${user.id}> no es un bot`;
        mensaje.reply(memberBot);
        break;

      case "creacion":
        const CreacionDeLaCuenta = user.createdAt.toLocaleString("en-US", { timeZone: "America/New_York" })
        mensaje.reply(`La fecha de creacion de la cuenta fue: ${CreacionDeLaCuenta}`)
        break;
      /* 
      
      Con poco de ayuda de IA como es constumbre xd, solicitamos informacion de al API de discord para tener el banner
      
      */
      case "baner":
        function banner(user, mensaje) {
          return new Promise((resolve, reject) => {
            mensaje.reply("🖼️ Se está cargando la imagen...");
            setTimeout(() => {
              user.fetch().then(fullUser => {
                const bannerURL = fullUser.bannerURL({ dynamic: true, size: 2048 });
                if (bannerURL) {
                  resolve(bannerURL);
                } else {
                  reject(`El uasrio no tiene banner`);
                }
              }).catch(err => {
                reject("❌ Ocurrió un error al obtener la información del usuario.");
              });
            }, 2000);
          });
        }
        banner(user, mensaje).then(img => {
          mensaje.reply(img);
        }).catch(err => {
          mensaje.reply(err);
        });

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