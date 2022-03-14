const Role = require("../models/role");

const roleValidator = async (role = "") => {
    const existRole = await Role.findOne({ role: role });
    if (!existRole) {
        throw new Error(
            `El rol ${role} no se encuentra validado en la base de datos.`
        );
    }
};

module.exports = {
    roleValidator,
};
