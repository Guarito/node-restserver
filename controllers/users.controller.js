// const express = require("express");
// const response = express.response;
// const request = express.request;

const { response, request } = require("express");

const usersGet = (req = request, res = response) => {
    res.json({
        msg: "Message from GET request from users.controller",
    });
};

const usersPost = (req = request, res = response) => {
    const body = req.body;
    // console.log(body);

    res.json({
        msg: "Message from POST request from users.ontroller",
        body,
    });
};

const usersPut = (req = request, res = response) => {
    res.json({
        msg: "Message from PUT request from users.ontroller",
    });
};

const usersDelete = (req = request, res = response) => {
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
