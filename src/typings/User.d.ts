import Discord from "discord.js";

export interface User extends Discord.User {
    isDev?: boolean;
    displayAvatar: string;
}
