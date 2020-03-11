const Command = require("../../handler/Command");

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

    let user = message.mentions.users.first(); // Mentioned user
    if (!user) user = message.author; // If there is no user mention it will return message.author as a user
    
    let image = user.avatarURL; // Get image URL
    let embed = new Discord.RichEmbed()
        .setColor("#0000000") // Set color (If you don't have ideas or preference, use RANDOM for random colors)
        .setImage(image) // Set image in embed
        message.channel.send(embed); // Send embed
}
}

module.exports = AvatarCommand;
