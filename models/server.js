const express = require("express");
const cors = require("cors");

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
        //CORS
        this.app.use(cors());

        //Directorio publico
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.get("/api", (req, res) => {
            res.json({
                msg: "Message from GET request",
            });
        });

        this.app.post("/api", (req, res) => {
            res.json({
                msg: "Message from POST request",
            });
        });

        this.app.put("/api", (req, res) => {
            res.json({
                msg: "Message from PUT request",
            });
        });

        this.app.delete("/api", (req, res) => {
            res.json({
                msg: "Message from DELETE request",
            });
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
