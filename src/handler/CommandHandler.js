const { Collection } = require("discord.js");
const { readdir } = require("fs");
const { resolve } = require("path");

/**
 * @class CommandHandler
 */
class CommandHandler {
    /**
     * @param {import("./BaldClient")} client
     * @param {String} path
     */
    constructor(client, path) {
        /**
         * @type {import("./BaldClient")}
         */
        this.client = client;
        /**
         * @type {String}
         */
        this.path = path;
        /**
         * @type {import("discord.js").Collection<String, Object>}
         */
        this.modules = new Collection();
        /**
         * @type {import("discord.js").Collection<String, Object>}
         */
        this.commands = new Collection();
    }

    build() {
        readdir(this.path, (err, dirs) => {
            if (err) throw Error(err);
            console.log(`Loading commands from ${dirs.length} categories.`);
            for (const dir of dirs) {
                const moduleDir = resolve(this.path, dir);
                const moduleConf = {
                    name: dir,
                    path: moduleDir,
                    commands: []
                };
                readdir(moduleDir, (err, files) => {
                    if (err) throw Error(err);
                    for (const file of files) {
                        const commandPath = resolve(moduleDir, file);
                        const command = new (require(commandPath));
                        command.path = commandPath;
                        command.module = moduleConf;
                        moduleConf.commands.push(command);
                        this.commands.set(command.name, command);
                    }
                });
                this.modules.set(dir, moduleConf);
            }
            console.log("Loaded!");
        });
        this.client.on("message", message => {
            const prefix = process.env.PREFIX;

            if (message.author.bot) return;
            if (!message.content.startsWith(prefix)) return;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const commandName = args.shift().toLocaleLowerCase();

            const command = this.commands.get(commandName) || this.commands.find(c => c.aliases.includes(commandName));
            try {
                command.exec(this.client, message, args);
            } catch (e) {
                console.error(e.stack);
            }
        });
    }
}

module.exports = CommandHandler;