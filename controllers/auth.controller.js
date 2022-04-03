const { response, request } = require("express");

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify(id_token);
        // console.log(googleUser);
        const { name, email, img } = googleUser;

        //Verificar existencia de correo en base de datos
        let user = await User.findOne({ email: email });
        // console.log(userExist);
        //Si el usuario no existe, creamos el usuario
        if (!user) {
            const data = {
                name,
                email,
                password: "default",
                img,
                google: true,
            };
            user = new User(data);
            // console.log(user);
            await user.save();
        }

        //Verificamos que el usuario este habilitado en la DB
        if (!user.state) {
            return res.status(401).json({
                msg: "Usuario inhabilitado. Por favor, comuniquese con el administrador.",
            });
        }

        //Generamos el JWT
        const jwt = await generateJWT(user.id);

        //Retorno de respuesta
        res.json({
            msg: "Login from Google success",
            user,
            jwt,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Token de Google no valido",
        });
    }
};
module.exports = {
    login,
    googleSignIn,
};
