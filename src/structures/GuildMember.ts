import { Structures } from "discord.js";
import { Guild } from "../typings/Guild";
import { GuildMember } from "../typings/GuildMember";
import { User } from "../typings/User";
import BaldClient from "../handler/BaldClient";

Structures.extend("GuildMember", DiscordGuildMember => {
    class ExtendedMember extends DiscordGuildMember {
        public isDev: GuildMember["isDev"];
        constructor(client: BaldClient, data, guild: Guild) {
            super(client, data, guild);
            // eslint-disable-next-line no-extra-parens
            this.isDev = (this.user as User).isDev ? true : false;
        }
    }

    return ExtendedMember;
});
