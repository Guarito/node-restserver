const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
    next();
};

module.exports = {
    isAdminRole,
};
