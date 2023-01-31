import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    carritos: {
        type: [Schema.Types.ObjectId],
        ref: 'Carrito'
    },
    estado: {
        type: Boolean,
        default: true,

    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model('Usuario', UsuarioSchema);