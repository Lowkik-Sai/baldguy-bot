const { exec } = require('child_process');
const Command = require("../../structures/BaseCommand");

/**
 * @extends {Command}
 */
class ExecCommand {
    constructor() {
        this.name = "exec";
        this.aliases = ['$', 'execute'];
        this.cooldown = 2;
        this.guildOnly = false;
        this.ownerOnly = true;
        this.info = {
            desc: "Execute a bash command",
            usage: "exec <command>",
            example: "exec refresh"
        };
        this.requiredPermissions = [];
    }

    /**
     * @param {import("../../handler/BaldClient")} client
     * @param {import("discord.js").Message} message
     * @param {Array<String>} args
     */
    async exec(client, message, args) {
        if (!args.join(" ")) return message.argsMissing(message, "No command provided!", this);
        const m  = await message.channel.send(`❯_ ${  args.join(' ')}`);
        exec(args.join(" "), async (e, stdout, stderr) => {
            if (e) return m.edit(`\`\`\`js\n${e.message}\`\`\``);
            if (!stderr && !stdout) return m.edit("Executed without result.");
            if (stdout) {
                const pages = paginate(stdout, 1950);
                for (const page of pages) {
                    await message.channel.send(`\`\`\`\n${page}\`\`\``);
                }
            }
            if (stderr) {
                const pages = paginate(stderr, 1950);
                for (const page of pages) {
                    await message.channel.send(`\`\`\`\n${page}\`\`\``);
                }
            }
        });

        function paginate (text, limit = 2000) {
            const lines = text.trim().split('\n');
            const pages = [];
            let chunk = '';
    
            for (const line of lines) {
                if (chunk.length + line.length > limit && chunk.length > 0) {
                    pages.push(chunk);
                    chunk = '';
                }
    
                if (line.length > limit) {
                    const lineChunks = line.length / limit;
    
                    for (let i = 0; i < lineChunks; i++) {
                        const start = i * limit;
                        const end = start + limit;
                        pages.push(line.slice(start, end));
                    }
                } else {
                    chunk += `${line}\n`;
                }
            }
    
            if (chunk.length > 0) {
                pages.push(chunk);
            }

            return pages;
        }
    }
}

module.exports = ExecCommand;
