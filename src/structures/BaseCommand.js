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
        client.commandHandler.commands.get(this.name).name = newCMD.name;
        client.commandHandler.commands.get(this.name).aliases = newCMD.aliases;
        client.commandHandler.commands.get(this.name).cooldown = newCMD.cooldown;
        client.commandHandler.commands.get(this.name).guildOnly = newCMD.guildOnly;
        client.commandHandler.commands.get(this.name).ownerOnly = newCMD.ownerOnly;
        client.commandHandler.commands.get(this.name).info = newCMD.info;
        client.commandHandler.commands.get(this.name).path = newCMD.path;
        client.commandHandler.commands.get(this.name).module = newCMD.module;
        client.commandHandler.commands.get(this.name).requiredPermissions = newCMD.requiredPermissions;
        client.commandHandler.commands.get(this.name).exec = newCMD.exec;
        return client.commandHandler.commands.get(this.name);
    }
}

module.exports = Command;
