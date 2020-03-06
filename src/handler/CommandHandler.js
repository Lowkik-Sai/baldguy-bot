const { readdir } = require("fs");

/**
 * @class CommandHandler
 */
class CommandHandler {
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
        });
    }
}