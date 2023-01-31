import { response } from "express";
import Usuario from '../models/usuario.js';
import { generarJWT } from "../helpers/generar-jwt.js";

export const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'No se ha encontrado un usuario con esa dirrección de correo'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Este usuario no está activo. Es posible que se haya eliminado'
            });
        }

        if (!usuario.password) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        });
    }
}