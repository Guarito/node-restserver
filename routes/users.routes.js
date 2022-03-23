const express = require("express");
const router = express.Router();

//more info: https://express-validator.github.io/docs/check-api.html
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
} = require("../controllers/users.controller");
const {
    roleValidator,
    emailValidator,
    userValidator,
} = require("../helpers/db-validators");

/* router.get("/", (req, res) => {
    res.json({
        msg: "Message from GET request",
    });
}); */

router.get("/", usersGet);

router.post(
    "/",
    check("name", "Ingrese un nombre valido").notEmpty(),
    check("email", "El correo ingresado es invalido").custom(emailValidator),
    check("password", "Debe contener mas de 6 digitos.").isLength({ min: 6 }),
    // check("role", "El rol definido no es valido.").isIn([
    //     "ADMIN_ROLE",
    //     "USER_ROLE",
    // ])
    check("role").custom((role) => roleValidator(role)),
    validateFields,
    usersPost
);

router.put(
    "/:id",
    check("id", "No es un ID valido de mongoDB")
        .isMongoId()
        .custom(userValidator),
    check("role").custom(roleValidator),
    validateFields,
    usersPut
);

router.delete(
    "/:id",
    check("id", "No es un ID valido de mongoDB")
        .isMongoId()
        .custom(userValidator),
    validateFields,
    usersDelete
);

module.exports = router;
