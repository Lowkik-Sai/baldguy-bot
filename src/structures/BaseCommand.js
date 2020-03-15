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
}

module.exports = Command;
