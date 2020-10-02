const Command = require("../../structures/BaseCommand");
const { MessageEmbed, version } = require('discord.js');

/**
 * @extends {Command}
 */
class StatsCommand extends Command {
    constructor() {
        super();
        this.name = "stats";
        this.aliases = ["stat", "statistic", "status"];
        this.info = {
            desc: "Show my statistic"
        };
        this.requiredPermissions = [];
    }

    /**
     * @param {import("../../handler/BaldClient")} client
     * @param {import("discord.js").Message} message
     * @param {Array<String>} args
     */
    exec(client, message, args) {
        const owner = [];
        const uptime = "";
        require("child_process").exec("uptime -p", (_, out) => {
            client.config.owners.forEach(own => {
                const fetch = client.users.resolve(own);
                owner.push(fetch);
            });
            const memory = client.util.bytesToSize(process.memoryUsage().heapUsed);
            const total = client.util.bytesToSize(require("os").totalmem);
            const embed = new MessageEmbed()
                .setAuthor(`${client.user.tag} Statistic`, client.util.getAvatar(client.user))
                .setColor("#7289DA")
                .setThumbnail(message.guild.iconURL())
                .addField("📊 Information", `
\`\`\`
Servers            : ${client.guilds.cache.size}
Users              : ${client.users.cache.size}
Ping               : ${client.ws.ping} ms
\`\`\`
            `)
                .addField("⚙ System Information", `
\`\`\`
CPU           : ${require("os").cpus()[0].model}
Processor     : ${require("os").cpus().length}
Memory        : ${memory} / ${total}
Node.JS       : ${process.version}
Discord.JS    : v${version}
Bot Uptime    : ${client.util.parseDur(client.uptime)}
${uptime !== "" ? `Server Uptime : ${uptime.slice(3)}` : ""}
\`\`\`
            `)
                .addField("👑 Developer", `
\`\`\`css
${owner.map(o => `${o.tag} (${o.id})`).join("\n")}
\`\`\`
            `)
                .addField("📌 Additional", `
\`\`\`ini
[ Thanks For Your Contribute To ZealCord ]
\`\`\`
[**GitHub Repo**](https://github.com/zealcordNation/baldguy-bot)
[**Our Website**](https://zealcord.xyz)
[**KaryaKarsa**](https://karyakarsa.com/zealcord)
[**Instagram**](https://www.instagram.com/zealcord/)
[**YouTube**](https://www.youtube.com/channel/UCnlD5sWvlxNqKiyE6RWufVw)
            `)
                .setFooter(`• Message For: ${message.author.tag}`, message.author.displayAvatar)
                .setTimestamp();
            message.channel.send(embed);
        });
    }
};

module.exports = StatsCommand;
