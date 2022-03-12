const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, "El rol es obligatorio"],
    },
});

const Role = model("Role", RoleSchema);
module.exports = Role;
