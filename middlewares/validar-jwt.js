import { request, response } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js"
import JWT from "../models/jwt.js";
import { generarJWT, generarRefreshToken } from "../helpers/generar-jwt.js";

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

        if (!usuario) {
            return res.status(401).json({
                msg: 'El token no es válido'
            });
        }

        if (!usuario.estado) {
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

export const validarRJWT = async (req = request, res = response, next) => {
    const rtoken = req.body.rtoken;

    if (!rtoken) {
        return res.status(401).json({
            msg: 'No hay token'
        });
    }

    try {
        const { uid } = jwt.verify(rtoken, process.env.SECRETORPRIVATEKEY);

        const refreshjwt = await JWT.findOne({ refreshToken: rtoken }, { _id: 0, refreshToken: 1 });

        if (!refreshjwt) {
            return res.status(401).json({
                msg: 'El token no es válido'
            });
        }

        const usuario = await Usuario.findById(uid);

        await JWT.deleteOne({ refreshToken: rtoken });

        const token = await generarJWT(usuario.id);
        const refreshToken = await generarRefreshToken(usuario.id);

        const rjwt = new JWT({ refreshToken });

        await rjwt.save();

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'No hay token o no es valido'
        });
    }
}

// ValidarRefreshToken
// Recibir refreshtoken en el body
// Verificar refresh con el jwt.verify
// Si se verifica correctamente buscar un documento en la db que contenga ese refresh
// Si se encuetra el documento, cargar info del usuario
// Eliminar documento de la db
// const token = await generarJWT(usuario.id);
// const refreshToken = await generarRefreshToken(usuario.id);

// const rjwt = new JWT({ refreshToken });

// await rjwt.save();
