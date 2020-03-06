const { MessageEmbed } = require("discord.js");
const Command = require("../../handler/Command");

/**
 * @extends {Command}
 */
class EvalCommand extends Command {
    constructor() {
        super();
        this.name = "eval";
        this.aliases = ["e", "ev"];
        this.ownerOnly = true;
        this.info = {
            desc: "Evaluate JS code",
            usage: "eval <code>"
        };
    }

    /**
     * @param {import("../../handler/BaldClient")} client
     * @param {import("discord.js").Message} message
     * @param {Array<String>} args
     */
    async exec(client, message, query) {
        const runnedtimestamp = message.createdTimestamp;
        const msg = message;
        const bot = client;

        const { args, flags } = this.parseQuery(query);

        const embed = new MessageEmbed();
        
        try {
            const code = args.join(" ");
            if (!code) return;
            let evaled;

            if (flags.includes("async")) evaled = await eval(`(async () => { ${code} })()`);
            else evaled = eval(code);
            
            if (flags.includes("silent")) return;
            
            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled, { depth: 0 });
                evaled = evaled.replace(bot.token, "[TOKEN]");
            }
            const output = this.clean(evaled);
            let result;
            if (output.length > 2000) {
                const { url } = await bot.util.hastebin.post(output);
                result = url;
            } else result = output;
            embed
                .setAuthor("Output")
                .setColor("0x42f468");
    
            const isURL = this.validateURL(result);
            if (flags.includes("no-embed")) {
                 message.channel.send(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
                 return;
            }
            embed.setDescription(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
        } catch (e) {
            const error = this.clean(e);
            let result;
            if (error.length > 2048) {
                const { url } = await bot.util.hastebin.post(error);
                result = url;
            } else result = error;
                
            embed
                .setAuthor("Error")
                .setColor("0xff0000");
         
            const isURL = this.validateURL(result);
        
            if (flags.includes("no-embed")) {
                message.channel.send(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
                return;
            }
            embed.setDescription(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
        }

        embed.setFooter(`⏱️ ${Date.now() - runnedtimestamp}ms`);
        message.channel.send(embed);
    }
            

    clean(text) {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }

    parseQuery(queries) {
        const args = [];
        const flags = [];
        for (const query of queries) {
            if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
            else args.push(query);
        }
        return { args, flags };
    }

    validateURL(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
         return !!pattern.test(str);
    }
}

module.exports = EvalCommand;