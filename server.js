const express = require("express");
const https = require("http");
const app = express();

app.use(express.static("public"));
app.get("/", (request, response) => {
    response.sendStatus(200);
});

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

setInterval(() => {
    https.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 270000);