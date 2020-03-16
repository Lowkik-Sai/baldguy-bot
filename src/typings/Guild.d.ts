import Discord from "discord.js";
import { GuildMember } from "./GuildMember";

export interface Guild extends Discord.Guild {
    prefix: string;
    fetchMember: (name: string) => GuildMember;
}