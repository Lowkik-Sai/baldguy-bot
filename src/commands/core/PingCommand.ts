/* eslint-disable @typescript-eslint/no-unused-vars */
import Command from "../../structures/BaseCommand";
import BaldClient from "../../handler/BaldClient";
import { Message } from "../../typings/Message";

export default class PingCommand extends Command {
    constructor() {
        super();
        this.name = "ping";
        this.aliases = ["pong"];
        this.info = {
            desc: "Check the WebSocket ping",
            usage: undefined,
            example: undefined
        };
        this.requiredPermissions = [];
    }

    exec(client: BaldClient, message: Message, args: string[]): any {
        message.channel.send(`PONG! \`${client.ws.ping}ms\``);
    }
}
