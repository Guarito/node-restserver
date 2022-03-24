const { response, request } = require("express");

const validateJWT = (req = request, res = response, next) => {
    const jwtHeader = req.header();
    console.log(jwtHeader);
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, privateKey);

    // console.log(payload, protectedHeader);
};

module.exports = {
    validateJWT,
};
