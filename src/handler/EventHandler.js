const { readdir } = require("fs");

/**
 * @class EventHandler
 */
class EventHandler {
    /**
     * @param {import("./BaldClient")} client
     * @param {String} path
     */
    constructor(client, path) {
        /**
         * @type {import("./BaldClient")}
         */
        this.client = client;
        /**
         * @type {String}
         */
        this.path = path;
    }

    build() {
        readdir(this.path, (err, files) => {
            if (err) throw Error(err);
            for (const file of files) {
                const event = new(require(`${this.path}/${file}`))(this.client);
                this.client.on(event.name, event.exec);
                console.info(`${file} events has loaded!`);
            }
        });
    }
}

module.exports = EventHandler;