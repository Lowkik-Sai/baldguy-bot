import { Structures} from "discord.js";
import { User } from "../typings/User";
import BaldClient from "../handler/BaldClient";

Structures.extend("User", DiscordUser => {
    class ExtendedUser extends DiscordUser {
        public isDev: User["isDev"];
        public displayAvatar: User["displayAvatar"];
        constructor(client: BaldClient, data: object) {
            super(client, data);
            this.isDev = client.config.owners.includes(this.id);
            this.displayAvatar = client.util.getAvatar(this);
        }
    }

    return ExtendedUser;
})