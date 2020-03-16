import { MessageEmbed } from "discord.js";
import { Message } from "../../typings/Message";
import Command from "../../structures/BaseCommand";
import BaldClient from "../../handler/BaldClient";

export default class EvalCommand extends Command {
    constructor() {
        super();
        this.name = "eval";
        this.aliases = ["ev", "e"];
        this.cooldown = 0;
        this.guildOnly = true;
        this.ownerOnly = true;
        this.requiredPermissions = [];
        this.info = {
            desc: "Run a javascript code",
            usage: "eval <code>",
            example: "eval 1 + 1"
        };
    }

    async exec(client: BaldClient, message: Message, args: string[]) {
        const runnedtimestamp = message.createdTimestamp;
        const msg = message;
        const bot = client;

        const embed = new MessageEmbed();

        try {
            const code = args.join(" ");
            if (!code) return message.argsMissing(message, "No code provided!", this);
            let evaled;

            if (message.flag.includes("async"))
                evaled = await eval(`(async () => { ${code} })()`);
            else evaled = eval(code);

            if (message.flag.includes("silent")) return;

            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled, {
                    depth: 0
                });
                evaled = evaled.replace(bot.token, "[TOKEN]");
            }
            const output = this.clean(evaled);
            let result;
            if (output.length > 2000) {
                const {
                    body: { key }
                } = await client.request
                    .post("https://bin.zealcord.xyz/documents")
                    .send(output);
                result = `https://bin.zealcord.xyz/${key}`;
            } else result = output;
            embed.setAuthor("Output").setColor("0x42f468");

            const isURL = this.validateURL(result);
            if (message.flag.includes("no-embed")) {
                message.channel.send(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
                return;
            }

            embed.setDescription(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
        } catch (e) {
            const error = this.clean(e);
            let result;
            if (error.length > 2000) {
                const {
                    body: { key }
                } = await client.request
                    .post("https://bin.zealcord.xyz/documents")
                    .send(error);
                result = `https://bin.zealcord.xyz/${key}`;
            } else result = error;

            embed.setAuthor("Error").setColor("0xff0000");

            const isURL = this.validateURL(result);

            if (message.flag.includes("no-embed")) {
                message.channel.send(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
                return;
            }
            embed.setDescription(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
        }

        embed.setFooter(`⏱️ ${Date.now() - runnedtimestamp}ms`);
        message.channel.send(embed);
    }

    private clean(text: string | any) {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }

    private validateURL(str: string) {
        const pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
            "i"
        ); // fragment locator
        return !!pattern.test(str);
    }
}
