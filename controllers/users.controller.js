const express = require("express");
const response = express.response;

const usersGet = (req, res = response) => {
    res.json({
        msg: "Message from GET request from users.controller",
    });
};

const usersPost = (req, res) => {
    res.json({
        msg: "Message from POST request from users.ontroller",
    });
};

const usersPut = (req, res) => {
    res.json({
        msg: "Message from PUT request from users.ontroller",
    });
};

const usersDelete = (req, res) => {
    res.json({
        msg: "Message from DELETE request from users.ontroller",
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
};
