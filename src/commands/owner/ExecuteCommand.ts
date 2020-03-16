import { exec } from "child_process";
import Command from "../../structures/BaseCommand";
import BaldClient from "../../handler/BaldClient";
import { Message } from "../../typings/Message";

export default class ExecuteCommand extends Command {
    constructor() {
        super();
        this.name = "execute";
        this.aliases = ["$", "exec"];
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

    async exec(client: BaldClient, message: Message, args: string[]) {
        if (!args.join(" "))
            return message.argsMissing(message, "No command provided!", this);
        const m = await message.channel.send(`❯_ ${args.join(" ")}`);
        exec(args.join(" "), async (e, stdout, stderr) => {
            if (e) return m.edit(`\`\`\`js\n${e.message}\`\`\``);
            if (!stderr && !stdout) return m.edit("Executed without result.");
            if (stdout) {
                const pages = this.paginate(stdout, 1950);
                for (const page of pages) {
                    await message.channel.send(`\`\`\`\n${page}\`\`\``);
                }
            }
            if (stderr) {
                const pages = this.paginate(stderr, 1950);
                for (const page of pages) {
                    await message.channel.send(`\`\`\`\n${page}\`\`\``);
                }
            }
        });
    }

    private paginate(text, limit?: number) {
        limit = limit ? limit : 2000;
        const lines = text.trim().split("\n");
        const pages: string[] = [];
        let chunk = "";

        for (const line of lines) {
            if (chunk.length + line.length > limit && chunk.length > 0) {
                pages.push(chunk);
                chunk = "";
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
