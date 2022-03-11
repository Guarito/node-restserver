const express = require("express");
const router = express.Router();

//more info: https://express-validator.github.io/docs/check-api.html
const { body, validationResult } = require("express-validator");

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

router.post("/", body("email").isEmail(), (req, res, next) => {
    try {
        validationResult(req).throw();
        usersPost(req, res);
    } catch (err) {
        // console.log(err);
        // Oh noes. This user doesn't have enough skills for this...
        res.status(400).json(err);
    }
});

router.put("/:id", usersPut);

router.delete("/", usersDelete);

module.exports = router;
