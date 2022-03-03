require("dotenv").config();

const Server = require("./models/server");

/*const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(port, () => {
    console.log(`hello from server on port ${port}`);
});
*/

//Instanciando el servidor creado como clase
const server = new Server();

//Haciendo llamado al metodo listener del server
server.listener();
