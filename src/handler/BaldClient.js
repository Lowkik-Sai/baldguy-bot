const { Client } = require("discord.js");
const { resolve } = require("path");
const Util = require("../handler/Util");
const EventHandler = require("./EventHandler");
const CommandHandler = require("./CommandHandler");

// Extending Discord.js Class
require("../structures/GuildMember");
require("../structures/User");

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
        this.util = new Util(this);
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
