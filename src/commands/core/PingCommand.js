const Command = require("../../handler/Command");

/**
 * @extends {Command}
 */
class PingCommand extends Command {
    constructor() {
        super();
        this.name = "ping";
        this.aliases = ["pong"];
        this.info = {
            desc: "WebSocket ping.",
            usage: "ping"
        };
    }

    /**
     * @param {import("../../handler/BaldClient")} client
     * @param {import("discord.js").Message} message
     * @param {Array<String>} args
     */
    exec(client, message, args) {
        message.channel.send(`Pong! \`${client.ws.ping}ms\``);
    }
}

module.exports = PingCommand;