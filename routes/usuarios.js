import { Router } from "express";
import { check } from "express-validator";
import { usuarioGet, usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controllers/usuarios.js";
import { existeCorreo, existeUsuarioPorId } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT, validarRJWT } from "../middlewares/validar-jwt.js";

export const routerUsuarios = Router();

routerUsuarios.get('/', usuariosGet);

routerUsuarios.get('/:id', [
    validarJWT,
    validarRJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioGet);

routerUsuarios.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeCorreo),
    validarCampos
], usuariosPost);

routerUsuarios.put('/:id', [
    validarJWT,
    validarRJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut);

routerUsuarios.delete('/:id', [
    validarJWT,
    validarRJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);