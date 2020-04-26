const Discord = require("discord.js");

class Util {
    constructor(client) {
        this.getAvatar = (user) => {
            let isGif = client.users.resolve(user).displayAvatarURL().split(".");
            isGif = isGif[isGif.length - 1] === "gif";
            return client.users.resolve(user).displayAvatarURL({ format: isGif ? "gif" : "png" });
        };

        this.getGuildIcon = (guild) => {
            if (guild.iconURL === null) return guild.iconURL();
            let isGif = guild.iconURL().split(".");
            isGif = isGif[isGif.length - 1] === "gif";
            return guild.iconURL({ format: isGif ? "gif" : "png" });
        };

        this.bytesToSize = (bytes) => {
            const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
            if (bytes == 0) return "0 Byte";
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
        };

        this.parseDur = (ms) => {
            let seconds = ms / 1000;
            const days = parseInt(seconds / 86400);
            seconds = seconds % 86400;
            const hours = parseInt(seconds / 3600);
            seconds = seconds % 3600;
            const minutes = parseInt(seconds / 60);
            seconds = parseInt(seconds % 60);

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

module.exports = Util;