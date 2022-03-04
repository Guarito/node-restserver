const express = require("express");
const cors = require("cors");

const usersRoutes = require("../routes/users.routes");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Listado de rutas definidas
        this.usersPath = "/api/users";

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
        //Rutas de User
        this.app.use(this.usersPath, usersRoutes);
    }

    //Metodo para lanzar el servidor en el puerto
    listener() {
        this.app.listen(this.port, (req, res) => {
            console.log(`Servidor en puerto ${this.port} desde models/server`);
        });
    }
}

module.exports = Server;
