const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        msg: "Message from GET request",
    });
});

router.post("/", (req, res) => {
    res.json({
        msg: "Message from POST request",
    });
});

router.put("/", (req, res) => {
    res.json({
        msg: "Message from PUT request",
    });
});

router.delete("/", (req, res) => {
    res.json({
        msg: "Message from DELETE request",
    });
});

module.exports = router;
