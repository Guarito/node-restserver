// const express = require("express");
// const response = express.response;
// const request = express.request;

const { response, request } = require("express");

const User = require("../models/user");

const usersGet = (req = request, res = response) => {
    res.json({
        msg: "Message from GET request from users.controller",
    });
};

const usersPost = async (req = request, res = response) => {
    const body = req.body;
    // console.log(body);

    const user = new User(body);

    //Grabando el usuario en la base de datos
    await user.save();

    res.json({
        msg: "Message from POST request from users.ontroller",
        user,
        // body,
    });
};

const usersPut = (req = request, res = response) => {
    const id = req.params.id;
    // console.log(id);
    res.json({
        msg: "Message from PUT request from users.ontroller",
        id,
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
