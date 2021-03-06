const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre es obligatorio"],
        },
        email: {
            type: String,
            required: [true, "El correo es obligatorio"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "La contrasena es obligatoria"],
        },
        img: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            default: "USER_ROLE",
            // enum: ["ADMIN_ROLE", "USER_ROLE"],
        },
        state: {
            type: Boolean,
            default: true,
        },
        google: {
            type: Boolean,
            default: false,
        },
    },
    {
        //Deshabilitando el __v
        versionKey: false,
    }
);

//Eliminando la propiedad de la contrasenha para que esta no retorne en la respuesta.
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    // userObject.uid = userObject._id;
    // delete userObject._id;
    // delete userObject.password;
    // return userObject;
    const { password, _id, ...user } = userObject;
    user.uid = _id;
    return user;
};

const User = model("User", UserSchema);

module.exports = User;
