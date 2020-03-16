/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Collection,
    MessageEmbed,
    BitFieldResolvable,
    PermissionString
} from "discord.js";
import { Message } from "../typings/Message";
import { readdir } from "fs";
import { resolve } from "path";
import BaldClient from "./BaldClient";
import { CommandComponent } from "../typings/Command";
import { ModuleComponent } from "../typings/Modules";

/**
 * @class CommandHandler
 */
export default class CommandHandler {
    /**
   * @param {import("./BaldClient")} client
   * @param {String} path
   */
    private client: BaldClient;
    private path: string;
    public modules: Collection<string, ModuleComponent>;
    public commands: Collection<string, CommandComponent>;
    constructor(client, path) {
        this.client = client;
        this.path = path;
        this.modules = new Collection();
        this.commands = new Collection();
    }

    build(): void {
        readdir(this.path, (err: any, dirs) => {
            if (err) throw Error(err);
            console.log(`Loading commands from ${dirs.length} categories...`);
            for (const dir of dirs) {
                const moduleDir = resolve(this.path, dir);
                const moduleConf: ModuleComponent = {
                    name: dir,
                    path: moduleDir,
                    commands: []
                };
                readdir(moduleDir, (err: any, files) => {
                    if (err) throw Error(err);
                    for (const file of files) {
                        const commandPath = resolve(moduleDir, file);
                        const command: CommandComponent = new (require(commandPath)).default();
                        command.path = commandPath;
                        command.module = moduleConf;
                        moduleConf.commands.push(command);
                        this.commands.set(command.name, command);
                    }
                });
                this.modules.set(dir, moduleConf);
            }
        });

        this.client.on("message", (message: Message) => {
            const prefix = this.client.config.prefix;

            if (message.author.bot) return;
            if (!message.content.startsWith(prefix)) return;
            const args = message.content
                .slice(prefix.length)
                .trim()
                .split(/ +/g);
            const commandName = args.shift()!.toLocaleLowerCase();

            const command =
        this.commands.get(commandName) ||
        this.commands.find(c => c.aliases.includes(commandName));
            if (!command) return;
            if (command.guildOnly && message.channel.type === "dm") return;
            if (command.ownerOnly && !message.author.isDev) return;
            if (command.requiredPermissions.length !== 0) {
                let requiredPermissions: BitFieldResolvable<PermissionString> | any =
          "";
                if (command.requiredPermissions.length === 1) {
                    requiredPermissions = command.requiredPermissions[0];
                } else {
                    requiredPermissions = command.requiredPermissions;
                }
                if (!message.member.permissions.has(requiredPermissions)) {
                    return this.permissionError(
                        message,
                        requiredPermissions,
                        command.name
                    );
                }
                if (
                    !message.guild.members
                        .resolve(this.client.user!.id)!
                        .permissions.has(requiredPermissions)
                ) {
                    return this.clientPermissionError(
                        message,
                        requiredPermissions,
                        command.name
                    );
                }
            }
            try {
                command.exec(this.client, message, args);
            } catch (e) {
                console.error(e.stack);
            }
        });
    }

    permissionError(
        message: Message,
        permission: string[],
        commandName: string
    ): void {
        const embed = new MessageEmbed()
            .setAuthor(
                `You don't have permission${
                    typeof permission === "object" ? "s" : ""
                } to execute this command`,
                this.client.util.getAvatar(this.client.user)
            )
            .setColor("#FF0000")
            .setThumbnail(this.client.util.getGuildIcon(message.guild))
            .addFields(
                {
                    name: "❓ **Why?**",
                    value: `You're trying to run **${commandName}** command, but you don't have the required permission${
                        typeof permission === "object" ? "s" : ""
                    } to do that.`
                },
                {
                    name: `ℹ **Required Permission${
                        typeof permission === "object" ? "s" : ""
                    }**`,
                    value:
            typeof permission === "object"
                ? permission.map(p => `\`${p}\``).join(", ")
                : permission
                }
            )
            .setTimestamp()
            .setFooter(
                `${message.author.username}@${message.guild.name}`,
                message.author.displayAvatar
            );
        message.channel.send(embed);
        return undefined;
    }

    clientPermissionError(
        message: Message,
        permission: string[],
        commandName: string
    ): void {
        const embed = new MessageEmbed()
            .setAuthor(
                `I don't have permission${
                    typeof permission === "object" ? "s" : ""
                } to execute this command,`,
                this.client.util.getAvatar(this.client.user)
            )
            .setColor("#FF0000")
            .setThumbnail(this.client.util.getGuildIcon(message.guild))
            .addFields(
                {
                    name: "❓ **Why?**",
                    value: `You're trying to run **${commandName}** command, but I (the bot) don't have the required permission${
                        typeof permission === "object" ? "s" : ""
                    } to do that.`
                },
                {
                    name: `ℹ **Required Permission${
                        typeof permission === "object" ? "s" : ""
                    }**`,
                    value:
            typeof permission === "object"
                ? permission.map(p => `\`${p}\``).join(", ")
                : permission
                }
            )
            .setTimestamp()
            .setFooter(
                `${message.author.username}@${message.guild.name}`,
                message.author.displayAvatar
            );
        message.channel.send(embed);
        return undefined;
    }
}
