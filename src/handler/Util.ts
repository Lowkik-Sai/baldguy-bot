import BaldClient from "./BaldClient";
import Discord from "discord.js";
import { Guild } from "../typings/Guild";

export default class Util {
    public getAvatar: (user: any | Discord.UserResolvable) => string;
    public getGuildIcon: (guild: Guild) => string;
    public bytesToSize: (bytes: number) => string;
    public parseDur: (ms: number) => string;
    constructor(client: BaldClient) {
        this.getAvatar = (user: any | Discord.UserResolvable): string => {
            let isGif: string[] | boolean = client.users
                .resolve(user)!
                .displayAvatarURL()
                .split(".");
            isGif = isGif[isGif.length - 1] === "gif";
            return client.users
                .resolve(user)!
                .displayAvatarURL({ format: isGif ? "gif" : "png" });
        };

        this.getGuildIcon = (guild: Guild): string => {
            if (guild.iconURL === null) return guild.iconURL() as string;
            let isGif: string[] | boolean = guild.iconURL()!.split(".");
            isGif = isGif[isGif.length - 1] === "gif";
            return guild.iconURL({ format: isGif ? "gif" : "png" }) as string;
        };

        this.bytesToSize = (bytes: number): string => {
            const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
            if (bytes == 0) return "0 Byte";
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
        };

        this.parseDur = (ms: number): string => {
            let seconds = ms / 1000;
            const days = parseInt(`${seconds / 86400}`);
            seconds = seconds % 86400;
            const hours = parseInt(`${seconds / 3600}`);
            seconds = seconds % 3600;
            const minutes = parseInt(`${seconds / 60}`);
            seconds = parseInt(`${seconds % 60}`);

            if (days) {
                return days + "D " + hours + "H " + minutes + "M " + seconds + "S";
            } else if (hours) {
                return hours + "H " + minutes + "M " + seconds + "S";
            } else if (minutes) {
                return minutes + "M " + seconds + "S";
            } else {
                return seconds + "S";
            }
        };
    }
}
