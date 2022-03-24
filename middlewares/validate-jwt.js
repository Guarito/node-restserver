const { response, request } = require("express");
const jose = require("jose");
const { createSecretKey } = require("crypto");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
    const jwtHeader = req.get("Authorization");
    // console.log(jwtHeader);
    if (!jwtHeader)
        return res.status(401).json({
            msg: "No existe token en la peticion",
        });

    try {
        const privateKey = createSecretKey(
            process.env.SECRETORPRIVATEKEY,
            "utf-8"
        );
        const { payload, protectedHeader } = await jose.jwtVerify(
            jwtHeader,
            privateKey
        );

        //Extraemos el uid
        const { uid } = payload;

        //Extraemos datos del usuario que se encuentra autenticado
        const userAuthenticated = await User.findById(uid);

        if (userAuthenticated) {
            return res.status(401).json({
                msg: "El usuario no existe.",
            });
        }

        //Verificar si el usuario autenticado es valido (no posea state:false)
        if (!userAuthenticated.state) {
            return res.status(401).json({
                msg: "Token invalido. El usuario que intenta ingresar se encuentra deshabilitado.",
            });
        }

        // Enviando datos del usuario autenticado a la request para su uso en los controladores
        req.user = userAuthenticated;

        //Verificar que el

        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({
            msg: "Token invalido.",
        });
    }

    //
    // console.log(payload, protectedHeader);
};

module.exports = {
    validateJWT,
};
