import { Router } from "express";
import { check } from "express-validator";
import { agregarProducto, crearCarrito, eliminarProducto, finalizarCarrito } from "../controllers/carritos.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

export const routerCarritos = Router();

routerCarritos.post('/', [
    validarJWT,
    check('cliente', 'Debe haber un cliente').not().isEmpty(),
    validarCampos
], crearCarrito);

routerCarritos.post('/:id', [
    validarJWT,
    check('productos', 'Debe haber al menos un producto para agregar').not().isEmpty(),
    validarCampos
], agregarProducto);

routerCarritos.put('/:id', [
    validarJWT
], finalizarCarrito);

routerCarritos.delete('/:id', [
    validarJWT,
    check('productos', 'Debe haber al menos un producto para eliminar').not().isEmpty(),
    validarCampos
], eliminarProducto);