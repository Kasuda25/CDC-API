import { response } from "express";
import Producto from "../models/producto.js";


export const productosGet = async (req, res = response) => {
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
    ]);

    res.json({
        total,
        productos
    });
}

export const productoGet = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    res.json(producto);
}

export const productoPost = async (req, res = response) => {
    const nombre = req.body.nombre;
    const precio = req.body.precio;

    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        precio
    }

    const producto = new Producto(data);

    await producto.save();

    res.json(producto);
}

export const productoPut = async (req, res = response) => {
    const { id } = req.params;
    const { estado, ...resto } = req.body;

    const producto = await Producto.findByIdAndUpdate(id, resto);

    res.json(producto);
}

export const productoDelete = async (req, res = response) => {
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrado);
}