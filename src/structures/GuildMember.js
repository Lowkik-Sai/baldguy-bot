const { Structures } = require("discord.js");

Structures.extend("GuildMember", GuildMember => {
    class ExtendedMember extends GuildMember {
        constructor(client, data, guild) {
            super(client, data, guild);
            this.isDev = this.user.isDev ? true : false;
        }
    }

    return ExtendedMember;
});