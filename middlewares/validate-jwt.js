const { response, request } = require("express");
const jose = require("jose");
const { createSecretKey } = require("crypto");

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
