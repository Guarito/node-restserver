const Role = require("../models/role");

const User = require("../models/user");

const roleValidator = async (role = "") => {
    const existRole = await Role.findOne({ role: role });
    if (!existRole) {
        throw new Error(
            `El rol ${role} no se encuentra validado en la base de datos.`
        );
    }
};

//Verificando existencia del correo electronico
//more info: https://mongoosejs.com/docs/api.html#model_Model.findOne
const emailValidator = async (email = "") => {
    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
        throw new Error(`El correo "${email}" se encuentra en uso.`);
    }
};

module.exports = {
    roleValidator,
    emailValidator,
};
