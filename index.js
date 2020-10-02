require("dotenv").config();
require("./src/Bot.js");
require("./server.js");

client.login(process.env.token);
