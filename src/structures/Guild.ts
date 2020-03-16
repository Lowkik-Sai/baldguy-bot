import { Structures, Collection, GuildMember } from "discord.js";
import { Guild } from "../typings/Guild";
import BaldClient from "../handler/BaldClient";

Structures.extend("Guild", DiscordGuild => {
    class ExtendedGuild extends DiscordGuild {
        public prefix: Guild["prefix"];
        public fetchMember: Guild["fetchMember"];
        constructor(client: BaldClient, data: object) {
            super(client, data);
            this.prefix = require("../config.json").prefix;
            this.fetchMember = (name: string): any => {
                const regex = new RegExp("^(?:<@​&?)?([0-9]+)>?$");
                if (!name || name === undefined) return undefined;
                if (regex.test(name)) name = name.replace(regex, "$1");
                const member: Collection<
                string,
                GuildMember
                > = this.members.cache.filter(r =>
                    r.displayName.toLowerCase().includes(name && name.toLowerCase())
                );
                if (member) return member.first();
                else return undefined;
            };
        }
    }

    return ExtendedGuild;
});
