const Command = require("../../handler/Command");
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
    exec(client, message, args) {

    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    const image = client.util.getAvatar(user); // Get image URL
    let embed = new MessageEmbed()
        .setColor("RANDOM") // Set color (If you don't have ideas or preference, use RANDOM for random colors)
        .setImage(image) // Set image in embed
        message.channel.send(embed); // Send embed
}
}

module.exports = AvatarCommand;
