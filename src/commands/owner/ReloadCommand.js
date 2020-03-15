const Command = require("../../structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

/**
 * @extends {Command}
 */
class ReloadCommand extends Command {
    constructor() {
        super();
        this.name = "reload";
        this.aliases = ["rl"];
        this.ownerOnly = true;
        this.info = {
            desc: "Only dev",
            usage: "reload --all\n{prefix}reload --category <CategoryName>\n{prefix}reload --command <CommandName>",
            example: "reload --all\n{prefix}reload --category Core\n{prefix}reload --command ping"
        };
        this.requiredPermissions = [];
    }

    /**
     * @param {import("../../handler/BaldClient")} client
     * @param {import("discord.js").Message} message
     * @param {Array<String>} args
     */
    async exec(client, message, args) {
        if (!message.flag[0]) return message.argsMissing(message, "Not enough arguments.", this);

        if (message.flag[0] === "all") {
            const embed = new MessageEmbed()
                .setColor("#00FF00")
                .setDescription("Reloading...");
            const MSG = await message.channel.send(embed);
            for (const c of client.commandHandler.commands.array()) {
                client.commandHandler.commands.get(c.name).reload(client); // FIX : disalah satu command class, ada yang ga ada reload function. IDK Why, please fix this.
            }
            embed.setDescription("Reloaded.");
            MSG.edit(embed);
        }

        if (message.flag[0] === "category") {
            if (!message.args[0]) return message.argsMissing(message, "No args was passed.", this);
            const category = message.args[0].toLowerCase();
            if (!client.commandHandler.modules.has(category)) return client.util.argsMissing(message, "No such category called: " + category + ".", this);
            const commands = client.commandHandler.modules.get(category).keyArray();
            const embed = new MessageEmbed()
            .setColor("#00FF00")
            .setDescription(`Reloading ${category} category...`);
            const MSG = await message.channel.send(embed);
            commands.forEach(cmd => {
                client.commandHandler.commands.get(cmd).reload(client);
            });
            embed.setDescription(`Category ${category} reloaded.`);
            MSG.edit(embed);
        }

        if (message.flag[0] === "command") {
            if (!message.args[0]) return this.client.util.argsMissing(message, "No args was passed.", this.help);
            let command = message.args[0].toLowerCase();
            if (client.commandHandler.commands.has(command) && client.commandHandler.commands.find(c => c.aliases.includes(command))) return this.client.util.argsMissing(message, "No such command called: " + command + ".", this.help);
            if (client.commandHandler.commands.find(c => c.aliases.includes(command))) command = client.commandHandler.commands.find(c => c.aliases.includes(command));
            const embed = new MessageEmbed()
            .setColor("#00FF00")
            .setDescription(`Reloading ${command} command...`);
            const MSG = await message.channel.send(embed);
            client.commandHandler.commands.get(command).reload(client);
            embed.setDescription(`${command} command reloaded.`);
            MSG.edit(embed);
        }
        return message;
    }
}

module.exports = ReloadCommand;
