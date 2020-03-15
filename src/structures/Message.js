const { Structures } = require("discord.js");
const { prefix } = require("../config.json");


Structures.extend("Message", Message => {
    class ExtendedMessage extends Message {
        constructor(client, data, channel) {
            super(client, data, channel);
            const queries = this.content.slice(prefix.length).trim().split(/ +/g);
            const command = this.content.startsWith(prefix) ? queries.shift().toLocaleLowerCase() || null : null;
            this.command = command;
            this.args = [];
            this.flag = [];
            for (const query of queries) {
                if (query.startsWith("--")) this.flag.push(query.slice(2).toLowerCase());
                if (query.startsWith("-")) this.flag.push(query.slice(1).toLowerCase());
                else this.args.push(query);
            }
        }
    }

    return ExtendedMessage;
});
