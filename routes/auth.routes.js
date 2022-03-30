const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { login } = require("../controllers/auth.controller");

router.post(
    "/login",
    check("email", "El correo ingresado es invalido").isEmail(),
    check("password", "La contraseña ingresada no es valida").notEmpty(),
    validateFields,
    login
);

router.get("/login", (req, res) => {
    res.send("Login");
});

module.exports = router;
