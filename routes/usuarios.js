import { Router } from "express";
import { check } from "express-validator";
import { usuarioGet, usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controllers/usuarios.js";
import { existeUsuarioPorId } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

export const routerUsuarios = Router();

routerUsuarios.get('/', usuariosGet);

routerUsuarios.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioGet);

routerUsuarios.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('documento', 'El numero de documento obligatorio').not().isEmpty(),
    validarCampos
], usuariosPost);

routerUsuarios.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut);

routerUsuarios.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);