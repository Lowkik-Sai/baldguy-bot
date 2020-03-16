import { MessageEmbed, version } from "discord.js";
import Command from "../../structures/BaseCommand";
import BaldClient from "../../handler/BaldClient";
import { Message } from "../../typings/Message";
import { Guild } from "../../typings/Guild";
import { exec } from "child_process";

export default class StatsCommand extends Command {
    constructor() {
        super();
        this.name = "stats";
        this.aliases = [];
        this.cooldown = 5;
        this.guildOnly = true;
        this.ownerOnly = false;
        this.requiredPermissions = [];
        this.info = {
            desc: "Show bot statistic",
            usage: undefined,
            example: undefined
        };
    }

    async exec(client: BaldClient, message: Message, args: string[]) {
        const owner: any = [];
        exec("uptime -p", (_, out, err) => {
            client.config.owners.forEach(own => {
                const fetch = client.users.resolve(own);
                owner.push(fetch);
            });
            const memory = client.util.bytesToSize(process.memoryUsage().heapUsed);
            const total = client.util.bytesToSize(require("os").totalmem);
            const uptime = err ? "" : out;
            const embed = new MessageEmbed()
                .setAuthor(
                    `${client.user!.tag} Statistic`,
                    client.util.getAvatar(client.user)
                )
                .setColor("#7289DA")
                .setThumbnail(
                    client.util.getGuildIcon(client.guilds.cache.get(
                        "332877090003091456"
                    ) as Guild)
                )
                .addField(
                    "📊 Information",
                    `
\`\`\`
Servers            : ${client.guilds.cache.size}
Users              : ${client.users.cache.size}
Ping               : ${client.ws.ping} ms
\`\`\`
            `
                )
                .addField(
                    "⚙ System Information",
                    `
\`\`\`
CPU           : ${require("os").cpus()[0].model}
CPU Core      : ${require("os").cpus().length}
Memory        : ${memory} / ${total}
Node.js       : ${process.version}
Discord.js    : v${version}
Bot Uptime    : ${client.util.parseDur(client.uptime as number)}
${uptime !== "" ? `Server Uptime : ${uptime.slice(3)}` : ""}
\`\`\`
            `
                )
                .addField(
                    "👑 Developer Of This Bot",
                    `
\`\`\`css
${owner.map(o => `${o.tag} (${o.id})`).join("\n")}
\`\`\`
            `
                )
                .addField(
                    "📌 Additional",
                    `
\`\`\`ini
[ Thanks For Your Contribute To ZealCord ]
\`\`\`
[**GitHub Repo**](https://github.com/zealcordNation/baldguy-bot)
[**Our Website**](https://zealcord.xyz)
[**KaryaKarsa**](https://karyakarsa.com/zealcord)
[**Instagram**](https://www.instagram.com/zealcord/)
[**YouTube**](https://www.youtube.com/channel/UCnlD5sWvlxNqKiyE6RWufVw)
            `
                )
                .setFooter(
                    `• Message For : ${message.author.tag}`,
                    message.author.displayAvatar
                )
                .setTimestamp();
            message.channel.send(embed);
        });
    }
}
