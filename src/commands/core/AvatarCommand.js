const Command = require("../../structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

/**
 * @extends {Command}
 */
class AvatarCommand extends Command {
    constructor() {
        super();
        this.name = "avatar";
        this.aliases = ["pfp"];
        this.info = {
            desc: "Shows a user profile picture",
            usage: "avatar [user]"
        };
    }

    /**
     * @param {import("../../handler/BaldClient")} client
     * @param {import("discord.js").Message} message
     * @param {Array<String>} args
     */
    async exec(client, message, args) {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || await message.guild.members.fetch({ query: args.join(" "), limit: 10 }) || message.author;
        const image = client.util.getAvatar(user);
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(image);
        message.channel.send(embed);
}
}

module.exports = AvatarCommand;
