import { readdir } from "fs";
import BaldClient from "./BaldClient";
import { EventComponent } from "../typings/Event";

/**
 * @class EventHandler
 */
export default class EventHandler {
    /**
     * @param {import("./BaldClient")} client
     * @param {String} path
     */
    private client: BaldClient;
    private path: string;
    constructor(client, path) {
        this.client = client;
        this.path = path;
    }

    build() {
        readdir(this.path, (err: any, files) => {
            if (err) throw Error(err);
            for (const file of files) {
                const event: EventComponent = new (require(`${this.path}/${file}`)).default(this.client);
                this.client.on(event.name, event.exec);
                console.info(`${file} events has loaded!`);
            }
        });
    }
}

module.exports = EventHandler;