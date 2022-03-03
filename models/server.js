const express = require("express");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.routes();
    }

    routes() {
        this.app.get("/", (req, res) => {
            res.send("Hello world");
        });
    }

    listener() {
        this.app.listen(this.port, (req, res) => {
            console.log(`Servidor en puerto ${this.port} desde models/server`);
        });
    }
}

module.exports = Server;
