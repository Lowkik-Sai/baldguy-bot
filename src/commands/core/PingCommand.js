const Command = require("../../structures/BaseCommand");

/**
 * @extends {Command}
 */
class PingCommand extends Command {
    constructor() {
        super();
        this.name = "ping";
        this.aliases = ["pong"];
        this.info = {
            desc: "Check the WebSocket ping"
        };
        this.requiredPermissions = [];
    }

    /**
     * @param {import("../../handler/BaldClient")} client
     * @param {import("discord.js").Message} message
     * @param {Array<String>} args
     */
    exec(client, message, args) {
        message.channel.send(`PONG! \`${client.ws.ping}ms\``);
    }
}

module.exports = PingCommand;