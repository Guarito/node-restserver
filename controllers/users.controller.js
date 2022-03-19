// const express = require("express");
// const response = express.response;
// const request = express.request;
const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
    const { from = 0, limit = 5 } = req.query;
    if (isNaN(from) || isNaN(limit)) {
        return res.json({
            msg: `Parameters on query must be numbers`,
        });
    }
    // const users = await User.find({ state: true });
    // const total = await User.countDocuments({ state: true });
    const query = { state: true };
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).limit(limit).skip(from),
    ]);

    res.json({
        // msg: "Message from GET request from users.controller",
        total,
        users,
    });
};

const usersPost = async (req = request, res = response) => {
    // const body = req.body;
    // console.log(body);
    const { name, password, email, role, google } = req.body;

    //Instancia del modelo User
    const user = new User({
        name,
        password,
        email,
        role,
        google,
    });

    //Encriptando la contrasenha
    // const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;

    //Grabando el usuario en la base de datos
    await user.save();

    res.json({
        msg: "Message from POST request from users.ontroller",
        user,
        // body,
    });
};

const usersPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        const hash = bcrypt.hashSync(password, 10);
        //Establecemos el hash al objeto rest para asignarle la nueva contraseha
        rest.password = hash;
    }
    const user = await User.findByIdAndUpdate(id, rest, {
        returnOriginal: false,
    });

    res.json({
        msg: "Message from PUT request from users.ontroller",
        user,
    });
};

const usersDelete = async (req = request, res = response) => {
    const { id } = req.params;

    // const user = await User.updateOne({ _id: id }, { state: false });
    const user = await User.findByIdAndUpdate(id, { state: false });

    res.json({
        // msg: "Message from DELETE request from users.ontroller",
        user,
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
};
