import { response } from "express";
import Carrito from "../models/carrito.js";

export const crearCarrito = async (req, res = response) => {
    const { cliente, productos } = req.body;
    const carrito = new Carrito({ cliente, productos });

    await carrito.save();

    res.json({
        carrito
    })
}

export const agregarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { productos } = req.body;

    const carrito = await Carrito.findById(id);

    if (carrito.activo == true) {
        await carrito.productos.push(productos);

        await carrito.save();
    } else {
        return res.status(400).json({
            msg: `Esta compra ha finalizado. Para hacer una nueva compra, vuelve a agregar productos al carrito`
        });
    }

    res.json(carrito);
}

export const eliminarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { productos } = req.body;

    const carrito = await Carrito.findById(id);

    if (carrito.activo == true) {
        const indice = await carrito.productos.findIndex((c) => c === productos);

        await carrito.productos.splice(indice, 1);
    
        await carrito.save();
    } else {
        return res.status(400).json({
            msg: `Esta compra ha finalizado. Para hacer una nueva compra, vuelve a agregar productos al carrito`
        });
    }

    res.json(carrito);
}

export const finalizarCarrito = async (req, res = response) => {
    const { id } = req.params;

    const carrito = await Carrito.findById(id);

    if (carrito.productos[0] == undefined) {
        return res.status(400).json({
            msg: `El carrito está vacio, agrega al menos un producto antes de finalizar`
        });
    } else {
        carrito.activo = false;

        await carrito.save();
    }

    res.json(carrito);
}