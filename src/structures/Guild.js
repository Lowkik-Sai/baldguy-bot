const { Structures } = require('discord.js');

Structures.extend('Guild', Guild => {
    class ExtendedGuild extends Guild {
        constructor(client, data) {
            super(client, data);
            this.fetchMember = (name) => {
                const regex = new RegExp('^(?:<@​&?)?([0-9]+)>?$');
                if (!name || name === undefined) return undefined;
                if (regex.test(name)) name = name.replace(regex, '$1');
                const member = this.members.cache.filter(r => r.displayName.toLowerCase().includes(name && name.toLowerCase()));
                if (member) return member.first();
                else return undefined;
            };
        }
    }

    return ExtendedGuild;
});