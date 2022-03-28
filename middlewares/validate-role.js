const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: "Se intenta verificar el rol sin validacion correcta de token.",
        });
    }
    const { role, name } = req.user;
    // console.log(role);
    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${name} no tiene permisos de administrador.`,
        });
    }
    next();
};

module.exports = {
    isAdminRole,
};
