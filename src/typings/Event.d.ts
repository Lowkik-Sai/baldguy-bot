import BaldClient from "../handler/BaldClient";

export interface EventComponent {
    client: BaldClient;
    name: string;
    exec: () => void | any;
}