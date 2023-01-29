import { Router } from "express";
import { check } from "express-validator";
import { agregarProducto, crearCarrito, eliminarProducto, finalizarCarrito } from "../controllers/carritos.js";
import { validarCampos } from "../middlewares/validar-campos.js";

export const routerCarritos = Router();

routerCarritos.post('/', [
    check('cliente', 'Debe haber un cliente').not().isEmpty(),
    validarCampos
], crearCarrito);

routerCarritos.post('/:id', [
    check('productos', 'Debe haber al menos un producto para agregar').not().isEmpty(),
    validarCampos
], agregarProducto);

routerCarritos.put('/:id', finalizarCarrito);

routerCarritos.delete('/:id', [
    check('productos', 'Debe haber al menos un producto para eliminar').not().isEmpty(),
    validarCampos
], eliminarProducto);