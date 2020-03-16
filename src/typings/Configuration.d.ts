import { Snowflake } from "discord.js";

export interface Configuration {
    prefix: string;
    owners: string[] | Snowflake[];
}