const BaldClient = require("./handler/BaldClient");

const client = new BaldClient({
    disableMentions: "everyone"
});
client.build();