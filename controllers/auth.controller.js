const { response, request } = require("express");
const { createSecretKey } = require("crypto");
const bcrypt = require("bcryptjs");
const jose = require("jose");

const User = require("../models/user");

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
        const payload = {
            uid: user.id,
        };
        const privateKey = createSecretKey(
            process.env.SECRETORPRIVATEKEY,
            "utf-8"
        );

        const jwt = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(privateKey);
        // console.log(jwt);

        const { payload: payloadBody, protectedHeader } = await jose.jwtVerify(
            jwt,
            privateKey
        );
        console.log(payloadBody, protectedHeader);

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
