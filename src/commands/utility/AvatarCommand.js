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
            usage: "avatar [user]",
            example: "avatar Clyde"
        };
        this.requiredPermissions = [];
    }

    /**
     * @param {import("../../handler/BaldClient")} client
     * @param {import("discord.js").Message} message
     * @param {Array<String>} args
     */
    async exec(client, message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.fetchMember(args.join(" ")) || message.member;
        const embed = new MessageEmbed()
        .setAuthor(`${member.user.username}'s Avatar`, member.user.displayAvatar)
        .setColor("RANDOM")
        .setImage(member.user.displayAvatar)
        .setFooter(`• Replying to: ${message.author.tag}`, message.author.displayAvatar)
        .setTimestamp();
        message.channel.send(embed);
}
}

module.exports = AvatarCommand;
