const express = require("express");
const router = express.Router();

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

router.post("/", usersPost);

router.put("/", usersPut);

router.delete("/", usersDelete);

module.exports = router;
