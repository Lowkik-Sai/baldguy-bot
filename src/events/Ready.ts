import { EventComponent } from "../typings/Event";
import BaldClient from "../handler/BaldClient";

export default class ReadyEvent implements EventComponent {
    public client: BaldClient;
    public name: EventComponent["name"];
    public exec: EventComponent["exec"];
    constructor(client) {
        this.client = client;
        this.name = "ready";
        this.exec = () => {
            console.log(`Logged in as ${client.user.tag}`);
        };
    }
}