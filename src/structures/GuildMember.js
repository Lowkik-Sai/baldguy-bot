const { Structures } = require('discord.js');

Structures.extend('GuildMember', GuildMember => {
    class ExtendedMember extends GuildMember {
        constructor(client, data) {
            super(client, data);
            this.isDev = this.user.isDev ? true : false;
        }
    }

    return GuildMember;
});