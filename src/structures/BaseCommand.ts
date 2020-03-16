import { CommandComponent } from "../typings/Command";
import BaldClient from "../handler/BaldClient";
import { Message } from "../typings/Message";

export default class Command implements CommandComponent {
    public name: CommandComponent["name"];
    public aliases: CommandComponent["aliases"];;
    public cooldown: CommandComponent["cooldown"];
    public guildOnly: CommandComponent["guildOnly"];
    public ownerOnly: CommandComponent["ownerOnly"];
    public requiredPermissions: CommandComponent["requiredPermissions"];
    public info: CommandComponent["info"];
    public path: CommandComponent["path"];
    public module: CommandComponent["module"];
    constructor() {
        this.name = null;
        this.aliases = [];
        this.cooldown = 2;
        this.guildOnly = false;
        this.ownerOnly = false;
        this.requiredPermissions = [];
        this.info = {
            desc: null,
            usage: null,
            example: null
        };
        this.path = null;
        this.module = null;
    }

    exec(client: BaldClient, message: Message, args: string[]): any {}

    reload(client: BaldClient): CommandComponent | void {
        delete require.cache[require.resolve(`${this.path}`)];
        const newCMD = new (require(this.path))();
        client.commandHandler.commands.get(this.name)!.name = newCMD.name;
        client.commandHandler.commands.get(this.name)!.aliases = newCMD.aliases;
        client.commandHandler.commands.get(this.name)!.cooldown = newCMD.cooldown;
        client.commandHandler.commands.get(this.name)!.guildOnly = newCMD.guildOnly;
        client.commandHandler.commands.get(this.name)!.ownerOnly = newCMD.ownerOnly;
        client.commandHandler.commands.get(this.name)!.info = newCMD.info;
        client.commandHandler.commands.get(this.name)!.path = newCMD.path;
        client.commandHandler.commands.get(this.name)!.module = newCMD.module;
        client.commandHandler.commands.get(this.name)!.requiredPermissions = newCMD.requiredPermissions;
        client.commandHandler.commands.get(this.name)!.exec = newCMD.exec;
        return client.commandHandler.commands.get(this.name);
    }
}