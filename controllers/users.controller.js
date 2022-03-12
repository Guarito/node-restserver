// const express = require("express");
// const response = express.response;
// const request = express.request;

const { response, request } = require("express");
const bcrypt = require("bcryptjs");



const User = require("../models/user");

const usersGet = (req = request, res = response) => {
    res.json({
        msg: "Message from GET request from users.controller",
    });
};

const usersPost = async (req = request, res = response) => {
    
    // const body = req.body;
    // console.log(body);
    const { name, password, email, role } = req.body;

    //Instancia del modelo User
    const user = new User({
        name,
        password,
        email,
        role,
    });

    //Verificando existencia del correo electronico
    //more info: https://mongoosejs.com/docs/api.html#model_Model.findOne
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
        return res.status(400).json({
            msg: "El correo se encuentra en uso.",
        });
    }

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
