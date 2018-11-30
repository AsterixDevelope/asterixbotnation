const Discord = require("discord.js");
const bot = new Discord.Client();

var prefix = ("/")

bot.on("ready", async () =>{
    console.log("Spreman sam");
    bot.user.setActivity("/asterixhelp");
});

bot.login(process.env.TOKEN);

bot.on("message", async message=> {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}report`){

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Ne mogu da nadjem tog korisnika.");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("__**Report je poslat**__")
        .setColor("#48A497")
        .addField("Reportovani Korisnik", `${rUser}`)
        .addField("Reportovan od strane", `${message.author}`)
        .addField("Kanal", message.channel)
        .addField("Razlog", reason);

        let reportschannel = message.guild.channels.find('name', "reports");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);

        return;
    } 
}); 

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return; 

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
      case "pitanje":
      let args = message.content.split(" ").slice(1);
      let messageArray = message.content.split(" ");
      let cmd = messageArray[0];
      let tte = args.join(" ")
      if (!tte){
          return message.reply("Molim vas postavite pitanje botu")};

          var replys = [
            "Ne mozes me preci",
            "Sta te briga",
            "Vucicu pederu",
            "Ja sam car",
            "Double pump je zivo sranje",
            "Kolko sam jadan",
            "Srecan rodjendan!"
        ];

        let reponse = (replys[Math.floor(Math.random() * replys.length)])
        var bembed = new Discord.RichEmbed()
        .setDescription("Zabava:Trebamo se zabavati")
        .addField("Pitanje",  tte)
        .addField("Odgovor",  reponse)
        message.delete(tte)
    message.channel.sendEmbed(bembed)
    break;
    case "predlog":  
        let xoargs = message.content.split(" ").slice(1);
        let xo03 = xoargs.join(" ")
        var xo02 = message.guild.channels.find('name', 'predlog');
        var embedglobal = new Discord.RichEmbed()
        .setColor("0x88CC14")
        .setTitle("Vas predlog je poslat.")
        .addField("Napisao", message.author)
        .addField("Predlog", xo03)
        .addField("Odgovor", "Vas odgovor je na cekanju")
        .addField("Admin & Asterix Nation", "<@515167453500669962>")
        .setTimestamp()
        message.delete(xo03)
     bot.channels.findAll('name', 'predlog').map(channel => channel.send(embedglobal))
           break;
           
}})

bot.on(`message`, message=> {

    if(message.content === prefix+ "asterixhelp"){
        var help_embed = new Discord.RichEmbed()
        .setColor("0x88CC14")
        .setTitle("Asterix Nation - Help")
        .addField("Sta je Asterix Nation", "**Zdravo, ja sam bot Asterix Nation, takodje, officijalni bot ovog' servera. Da bi ste videli moje ostale komande , napisite /komande, i izacice vam sve moje komande, koje mozete korstiti.**")
        .addField("Asterix Nation - Help", "**Takodje ukoliko imate neko pitanje u vezi bota , slobodno to mozete pitati Asterixa. Takodje ovaj bot je trenutno dostupan samo u nasem Discord serveru, tako da nemojte traziti molim vas link za invitaciju.**")
        .setTimestamp()
       message.channel.sendMessage(help_embed);
       message.delete(prefix+ "asterixhelp")
       console.log("Jedan korisnik je koristio ovu komandu")
    }
    if(message.content === prefix+ "komande"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#48A497")
        .setTitle("Asterix Nation - Komande = /komande")
        .addField("/ban", "Komanda, kojem mozete banovati nekog korsinika (clana) sa servera. Sve sto treba jeste da napisete /ban + __tagujte osobu koju zelite kickovati__.")
        .addField("/komande", "Ova komanda, koja vam objasnjava ostale komande.")
        .addField("/report", "Komanda koja sluzi da reportujete nekog clana servera. Napravite /report + __TAG OSOBE KOJU ZELITE REPORTOVATI__ + **Razlog zasto je reportujete**. Zabranjeno je reportovanje bez razloga. Report je ozbiljna stvar. Ovom komandom mozete i te kako pomoci serveru. Hvala!")
        .addField("/asterixhelp", "Komanda koja vam objasnjava sta je Asterix Nation BOT, i sta sve on moze raditi na ovom Discord serveru")
        .addField("/predlog", "Komanda kojom nam vi mozete pomoci u daljem razvijanju servera, tako ste cete nam predloziti nesto cime bi mogli poboljsati server.")
        .addField("/predlog", "Sve sto treba jeste to, da idete u kanal **#saljite-predloge**, i tamo trebate napisati /predlog + __**vas predlog**__ , posle nekog vremena BOT ce vam odgovoriti, da li je vas predlog prihvacen ili odbijen. Takodje mozete glasati u kanalu **#predlog**, da li je predlog dobar ili ne.")
        .addField("/pitanje", "Komanda kojom mozete pitati nesto bota. Sve sto treba jeste to da napisete /pitanje + __vase pitanje__ , i bot ce vam automatski odgovoriti kako on misli da treba.")
        .addField("/kick", "Komanda, kojem mozete kickovati nekog korsinika (clana) sa servera. Sve sto treba jeste da napisete /kick + __tagujte osobu koju zelite kickovati__.")
        .setFooter("Asterix Nation - Sve komande")
       message.delete(prefix+ "komande");
       return message.channel.send(help_embed);
    }
});
bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "Owner");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Nemate dozvolu da kickujete ovog' membera.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
            return message.reply("Molim vas tagujte osobu koju zelite da KICKUJEM.").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Ovaj korisnik ne postoji, ili ga jednostavno ne mozete kickovati.").catch(console.error);
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Nemam dozvolu da napravim ovu komadnu").catch(console.error);
        }
        kickMember.kick().then(member => {
            return message.reply(`${member.user.username} je kickovan sa servera.`).catch(console.error);
        }).catch(console.erorr);

    }
})

bot.on(`message`, message=> {

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Nemate dozvolu da napravite ovu komandu");
        
        if(message.mentions.users.size === 0) {
            return message.channel.send("Morate tagovati osobu koju zelite da banujem");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Ne znam da li korsinik postoji");
        }
    
        if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Nemam dozvolu da banujem korsnike.");
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} je banovan od strane ${message.author}.`)
        }

        )
}})


    



    

