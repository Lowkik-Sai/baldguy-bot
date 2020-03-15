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
     * @param {import("../handler/BaldClient")} client
     * @param {import("discord.js").Message} message
     * @param {Array<String>} args
     */
    exec(client, message, args) {}

    /**
     * 
     * @param {import("../handler/BaldClient")} client 
     */
    reload(client) {
        delete require.cache[require.resolve(`${this.path}`)];
        const newCMD = new (require(this.path))();
        client.commandHandler.commands.get(this.name).exec = newCMD.exec;
        return client.commandHandler.commands.get(this.name);
    }
}

module.exports = Command;
