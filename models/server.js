const express = require("express");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    middlewares() {
        //Directorio publico
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.get("/api", (req, res) => {
            res.send("Hello world");
        });
    }

    //Metodo para lanzar el servidor en el puerto
    listener() {
        this.app.listen(this.port, (req, res) => {
            console.log(`Servidor en puerto ${this.port} desde models/server`);
        });
    }
}

module.exports = Server;
