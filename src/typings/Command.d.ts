import BaldClient from "../handler/BaldClient";
import { Message } from "./Message";
import { PermissionString } from "discord.js";

export interface CommandComponent {
    exec: (client: BaldClient, message: Message, args: string[]) => any;
    name: string | any;
    aliases: string[];
    cooldown: number;
    guildOnly: boolean;
    ownerOnly: boolean;
    path: string | any;
    module: object | any;
    requiredPermissions: PermissionString | Array<any>;
    info: {
        desc: string | any;
        usage: string | any;
        example: string | any;
    };
}
