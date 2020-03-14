const { Structures } = require('discord.js');

Structures.extend('User', User => {
    class ExtendedUser extends User {
        constructor(client, data) {
            super(client, data);
            this.isDev = client.config.owners.includes(this.id);
        }
    }

    return User;
});