const { response, request } = require("express");

const login = (req = request, res = response) => {
    res.json({
        msg: "Login success",
    });
};

module.exports = {
    login,
};
