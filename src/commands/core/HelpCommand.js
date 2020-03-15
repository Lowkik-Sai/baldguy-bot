const Command = require("../../structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

class HelpCommand extends Command {
    constructor() {
      super();
      this.name = "help";
      this.aliases = ["h"];
      this.cooldown = 2;
      this.info = {
        desc: "show this bot command list or view the command details",
        usage: "help [command]",
        example: "help avatar"
      };
      this.requiredPermissions = [];
    }

    exec(client, message, args) {
      if (!args[0]) {
        const { prefix } = client.config;
        const modules = client.commandHandler.modules.array();
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(
            `${client.user.username}'s commands list`,
            client.user.displayAvatarURL({ format: "png", size: 512 })
          )
          .setThumbnail(
            client.user.displayAvatarURL({ format: "png", size: 512 })
          )
          .setDescription(
            `Use ${prefix}help [command] to get more info on a specific command, for example: ${prefix}help ping`
          );
        for (const mod of modules) {
          embed.addField(
            `${toTitleCase(mod.name)}`,
            mod.commands
              .filter(x => x.name !== "help")
              .map(x => `**\`${x.name}\`**`)
              .join(", ")
          );
        }
        return message.channel.send(embed);
      } else {
        const cmd = args[0];
        if (
          client.commandHandler.commands.has(cmd) ||
          client.commandHandler.commands.find(x=> x.aliases.includes(cmd))
        ) {
          const command = client.commandHandler.commands.get(cmd) || client.commandHandler.commands.find(x=> x.aliases.includes(cmd));
          const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`📁 Command info for ${command.name}`)
            .setDescription(command.info.desc)
            .addField(`Aliases`, command.aliases.length > 0 ? command.aliases.map(x => `\`${x}\``).join(", ") : `No aliases`)
            .addField(`Usage`, `\`${command.info.usage === undefined ? "No usage" : command.info.usage}\``)
            .addField(`Example`, `\`${command.info.example === undefined ? "No example" : `${message.guild.prefix}${command.info.example}`}\``)
            .addField(
              `Cooldown`,
              `${
                isNaN(command.cooldown) ? "No cooldown" : `${command.cooldown}s`
              }`
            )
            .addField(
              `Guild Only`,
              `${
                command.guildOnly === undefined || command.guildOnly === false
                  ? "No"
                  : "Yes"
              }`,
              true
            )
            .addField(
              `Developer Only`,
              `${
                command.ownerOnly === undefined || command.ownerOnly === false
                  ? "No"
                  : "Yes"
              }`
            )
            .setFooter(
              `Don't include <> or [], it's mean <> is required and [] is optional`
            );
          return message.channel.send(embed);
        }

        if (
          !client.commandHandler.commands.has(cmd) ||
          !client.commandHandler.commands.find(c => c.aliases.includes(cmd))
        ) {
        const embed = new MessageEmbed()
          .setColor("#FF1000")
          .setTitle("🚫 Not Found")
          .setDescription(
            `Command with name or aliases \`${cmd}\` doesn't exists. Perhaps typo?`
          );
        return message.channel.send(embed);
      }
    }
  }
}

module.exports = HelpCommand;

function toTitleCase(text) {
  let newstr = text.split(" ");
  for (let i = 0; i < newstr.length; i++) {
    if (newstr[i] === "") continue;
    const copy = newstr[i].substring(1).toLowerCase();
    newstr[i] = newstr[i][0].toUpperCase() + copy;
  }
  newstr = newstr.join(" ");
  return newstr;
}
