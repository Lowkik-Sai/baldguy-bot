import { Client } from "discord.js";
import { resolve } from "path";
import { config } from "dotenv";
import { Configuration } from "../typings/Configuration";
import EventHandler from "./EventHandler";
import CommandHandler from "./CommandHandler";
import Util from "./Util";
import Config from "../config.json";
import * as request from "superagent";

// Extending Discord.js Class
import "../structures/User";
import "../structures/Guild";
import "../structures/GuildMember";
import "../structures/Message";

/**
 * @class BaldClient
 * @extends {Client}
 */
export default class BaldClient extends Client {
    public config: Configuration;
    public util: Util;
    public request: typeof request;
    public eventHandler: EventHandler;
    public commandHandler: CommandHandler;
    constructor(opt) {
        super(opt);
        this.util = new Util(this);
        this.config = Config;
        this.request = request;
        this.eventHandler = new EventHandler(this, resolve(__dirname, "..", "events"));
        this.commandHandler = new CommandHandler(this, resolve(__dirname, "..", "commands"));
    }

    public build() {
        config();
        this.login(process.env.TOKEN).catch(e => { console.error(e); process.exit(1) });
        this.eventHandler.build();
        this.commandHandler.build();
    }
}