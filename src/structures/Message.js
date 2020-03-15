const { Structures, MessageEmbed } = require("discord.js");
const { prefix } = require("../config.json");

Structures.extend("Message", Message => {
    class ExtendedMessage extends Message {
        constructor(client, data, channel) {
            super(client, data, channel);
            const queries = this.content.slice(prefix.length).trim().split(/ +/g);
            const command = this.content.startsWith(prefix) ? queries.shift().toLocaleLowerCase() || null : null;
            this.command = command;
            this.args = [];
            this.flag = [];
            for (const query of queries) {
                if (query.startsWith("--")) this.flag.push(query.slice(2).toLowerCase());
                if (query.startsWith("-")) this.flag.push(query.slice(1).toLowerCase());
                else this.args.push(query);
            }
            
            this.argsMissing = (msg, reason, cmd) => {
                const usage = cmd.info.usage ? `**${msg.guild.prefix}**${cmd.info.usage.replace(new RegExp("{prefix}", "g"), `**${msg.guild.prefix}**`)}` : "No usage provided.";
                const example = cmd.info.example ? `**${msg.guild.prefix}**${cmd.info.example.replace(new RegExp("{prefix}", "g"), `**${msg.guild.prefix}**`)}` : "No example provided.";
                const embed = new MessageEmbed()
                .setAuthor(`It's not how you use ${cmd.name}`, `https://hzmi.xyz/assets/images/596234507531845634.png`)
                .setColor("#FF0000")
                .setThumbnail(client.user.displayAvatarURL())
                .addFields({
                    name: "ℹ Reason:",
                    value: `**${reason}**`
                }, {
                    name: "<:yes:615730280619048970> Correct Usage :",
                    value: usage
                }, {
                    name: "📃 Example :",
                    value: example
                })
                .setTimestamp()
                .setFooter(`Get more info about this command using ${msg.guild.prefix}help ${cmd.name}`, "https://hzmi.xyz/assets/images/390511462361202688.png");
                return msg.channel.send(embed);
            }
        }
    }

    return ExtendedMessage;

});