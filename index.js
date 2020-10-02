require("dotenv").config();
require("./src/Bot.js");
require("./server.js");

const bot = new Client({
    disableMentions: "all"
});

bot.login(process.env.token);
