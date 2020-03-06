const { Client } = require("discord.js");
const EventHandler = require("./EventHandler");
const CommandHandler = require("./CommandHandler");
const { resolve } = require("path");

/**
 * @class BaldClient
 * @extends {Client}
 */
class BaldClient extends Client {
    /**
     * @param {import("discord.js").ClientOptions} opt
     */
    constructor(opt) {
        super(opt);
        this.config = require("../config.json");
        this.request = require("superagent");
        this.eventHandler = new EventHandler(this, resolve(__dirname, "..", "events"));
        this.commandHandler = new CommandHandler(this, resolve(__dirname, "..", "commands"));
    }

    build() {
        this.eventHandler.build();
        this.commandHandler.build();
        this.login(process.env.TOKEN);
    }
}

module.exports = BaldClient;
