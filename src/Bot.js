const BaldClient = require("./handler/BaldClient");

const client = new BaldClient({
    disableMentions: "everyone",
    fetchAllMembers: false,
    presence: {
        status: "dnd",
        activity: {
            name: "to Zealcord",
            url: "https://twitch.tv/zealcord/",
            type: "STREAMING"
        }
    }
});

client.build();