import Discord from "discord.js";
import { GuildMember } from "./GuildMember";

export interface User extends Discord.User {
    isDev?: boolean;
    displayAvatar: string;
}