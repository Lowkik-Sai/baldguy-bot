/**
 * @class Command
 */
class Command {
    constructor() {
        this.name = null;
        this.aliases = [];
        this.cooldown = 2;
        this.guildOnly = false;
        this.ownerOnly = false;
        this.info = {
            desc: null,
            usage: null,
            example: null
        };
        this.path = null;
        this.module = null;
        this.requiredPermissions = [];
    }

    /**
     * @param {import("../../handler/BaldClient")} client
     * @param {import("discord.js").Message} message
     * @param {Array<String>} args
     */
    exec(client, message, args) {}

    reload() {
        delete require.cache[require.resolve(`${this.path}`)];
        const newCMD = new (require(`${this.path}`).default)();
        this.client.commands.get(this.help.name).run = newCMD.run;
        this.client.commands.get(this.help.name).help = newCMD.help;
        this.client.commands.get(this.help.name).conf = newCMD.conf;
        return this.client.commands.get(this.help.name);
    }
}

module.exports = Command;
