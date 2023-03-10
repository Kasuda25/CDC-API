import { Router } from "express";
import { check } from "express-validator";
import { productoPut, productoDelete, productoGet, productoPost, productosGet } from "../controllers/productos.js";
import { existeProductoPorId } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT, validarRJWT } from "../middlewares/validar-jwt.js";

export const routerProductos = Router();

routerProductos.get('/', productosGet);

routerProductos.get('/:id', [
    validarJWT,
    validarRJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoGet);

routerProductos.post('/', [
    validarJWT,
    validarRJWT,
    check('nombre', 'El nombre es obligaotrio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos
], productoPost);

routerProductos.put('/:id', [
    validarJWT,
    validarRJWT,
    check('id').custom(existeProductoPorId),
    validarCampos
], productoPut);

routerProductos.delete('/:id', [
    validarJWT,
    validarRJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productoDelete);