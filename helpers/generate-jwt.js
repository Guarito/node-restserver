const jose = require("jose");
const { createSecretKey } = require("crypto");

const generateJWT = async (uid = "") => {
    const payload = {
        uid,
    };
    const privateKey = createSecretKey(process.env.SECRETORPRIVATEKEY, "utf-8");

    const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(privateKey);
    // console.log(jwt);
    return jwt;
};

module.exports = {
    generateJWT,
};
