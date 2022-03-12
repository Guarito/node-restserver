const express = require("express");
const router = express.Router();

//more info: https://express-validator.github.io/docs/check-api.html
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const Role = require("../models/role");

const {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
} = require("../controllers/users.controller");

/* router.get("/", (req, res) => {
    res.json({
        msg: "Message from GET request",
    });
}); */

router.get("/", usersGet);

router.post(
    "/",
    check("name", "Ingrese un nombre valido").notEmpty(),
    check("email", "Ingrese un correo valido.").isEmail(),
    check("password", "Debe contener mas de 6 digitos.").isLength({ min: 6 }),
    // check("role", "El rol definido no es valido.").isIn([
    //     "ADMIN_ROLE",
    //     "USER_ROLE",
    // ])
    check("role").custom(async (role = "") => {
        const existRole = await Role.findOne({ role: role });
        if (!existRole) {
            throw new Error(
                `El rol ${role} no se encuentra validado en la base de datos.`
            );
        }
    }),
    validateFields,
    usersPost
);

router.put("/:id", usersPut);

router.delete("/", usersDelete);

module.exports = router;
