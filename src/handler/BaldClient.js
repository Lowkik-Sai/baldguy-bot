const { Client } = require("discord.js");
const EventHandler = require("./EventHandler");
const { resolve } = require("path");

/**
 * @class BaldClient
 * @extends {Client}
 */
class BaldClient extends Client {
    constructor(opt) {
        super(opt);
        this.eventHandler = new EventHandler(this, resolve(__dirname, "..", "events"));
    }

    build() {
        this.eventHandler.build();
        this.login(process.env.TOKEN);
    }
}

module.exports = BaldClient;