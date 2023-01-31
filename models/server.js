import express from "express";
import cors from "cors";
import { dbConnection } from "../db/config.js";
import { routerUsuarios } from "../routes/usuarios.js";
import { routerProductos } from "../routes/productos.js";
import { routerCarritos } from "../routes/carritos.js";
import { routerAuth } from "../routes/auth.js";

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            carrito: '/api/carrito',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.carrito, routerCarritos);
        this.app.use(this.paths.productos, routerProductos);
        this.app.use(this.paths.usuarios, routerUsuarios);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}