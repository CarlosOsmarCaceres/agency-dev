"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* import {  Provision  } from '../../../domain/Dist/index.js';
import {  User  } from '../../../domain/Dist/index.js';
import { UserRole  } from '../../../domain/Dist/index.js';
import {  Cart  } from '../../../domain/Dist/index.js'; */
const express_1 = __importDefault(require("express"));
// Crear la aplicación Express
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // Usar variable de entorno o puerto 3000 por defecto
// Middleware para parsear JSON en las peticiones
app.use(express_1.default.json());
// Ruta de prueba básica
app.get('/', (req, res) => {
    res.send('¡API de Agencia de Desarrollo funcionando!');
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`⚡️[server]: Servidor corriendo en http://localhost:${port}`);
});
