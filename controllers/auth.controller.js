const { response, request } = require("express");

const bcrypt = require("bcryptjs");


const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        //Verifica si el email existe
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                msg: "El correo y contraseña ingresado no se encuentran registrados.",
            });
        }
        // console.log(user);

        //Verificacion del estado del usuario (si esta activo)
        if (!user.state) {
            return res.status(400).json({
                msg: "Usuario inactivo",
            });
        }
        //Verificacion de contraseña\
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                msg: "La contraseña ingresada es incorrecta. Intente nuevamente.",
            });
        }
        // console.log(checkPassword);

        //Generar el JWT
        const jwt = await generateJWT(user.id);

        //Retorno de respuesta
        res.json({
            msg: "Login success",
            user,
            jwt,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Ha ocurrido un error. Por favor, comuniquese con el administrador.",
        });
    }
};

module.exports = {
    login,
};
