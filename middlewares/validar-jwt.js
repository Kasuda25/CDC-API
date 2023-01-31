import { request, response } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js"

export const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Se necesita un token'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'El token no es válido'
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Este usuario no está activo. Es posible que se haya eliminado'
            });
        }

        req.usuario = usuario;

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'El token no es válido'
        });
    }
}