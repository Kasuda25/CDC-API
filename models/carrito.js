import { Schema, model } from "mongoose";

const CarritoSchema = Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos: {
        type: [Schema.Types.ObjectId],
        ref: 'Producto'
    },
    total: {
        type: Number
    },
    activo: {
        type: Boolean,
        default: true
    }
});

CarritoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export default model('Carrito', CarritoSchema);