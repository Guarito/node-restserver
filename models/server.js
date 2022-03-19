const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

const authRoutes = require("../routes/auth.routes");
const usersRoutes = require("../routes/users.routes");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Listado de rutas definidas
        this.authPath = "/api/auth";
        this.usersPath = "/api/users";

        //Conectar a base de datos
        this.connectionDB();

        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    async connectionDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static("public"));
    }

    routes() {
        //Ruta de auth
        this.app.use(this.authPath, authRoutes);
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
