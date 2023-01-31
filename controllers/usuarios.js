import { response } from "express";
import Usuario from "../models/usuario.js"
import { validationResult } from "express-validator"
import bcryptjs from "bcryptjs";

export const usuariosGet = async (req, res = response) => {
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        total,
        usuarios
    });
}

export const usuarioGet = async (req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id)

    res.json(usuario);
}

export const usuariosPost = async (req, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { nombre, correo, password } = req.body;
    const usuario = new Usuario({ nombre, correo, password });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
}

export const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

export const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
}