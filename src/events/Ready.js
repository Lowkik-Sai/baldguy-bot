/**
 * @class ReadyEvent
 */
class ReadyEvent {
    /**
     * @param {import("discord.js").Client} client
     */
    constructor(client) {
        this.client = client;
        this.name = "ready";
        this.exec = () => {
            console.log(`Logged in as ${client.user.tag}`);
        };
    }
}

module.exports = ReadyEvent;