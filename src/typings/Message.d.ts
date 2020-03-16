import Discord from "discord.js";
import { User } from "./User";
import { GuildMember } from "./GuildMember";
import { Guild } from "./Guild";
import { CommandComponent } from "./Command";

export interface Message extends Discord.Message {
    author: User;
    member: GuildMember;
    guild: Guild;
    args: string[];
    command: string | any;
    flag: string[];
    argsMissing: (msg: Message, reason: string, cmd: CommandComponent) => Promise<void | Message | Message[]>;
}