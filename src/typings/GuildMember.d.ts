import Discord from "discord.js";
import { User } from "./User";

export interface GuildMember extends Discord.GuildMember {
    user: User;
    isDev?: boolean;
}