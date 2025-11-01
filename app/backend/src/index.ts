/* import {  Provision  } from '../../../domain/Dist/index.js';
import {  User  } from '../../../domain/Dist/index.js';
import { UserRole  } from '../../../domain/Dist/index.js';
import {  Cart  } from '../../../domain/Dist/index.js'; */
import express, { Express, Request, Response } from 'express';
import userRoutes from './routes/user.routes.js';
import catalogRoutes from './routes/catalog.routes.js';

// Crear la aplicación Express
const app: Express = express();
const port = process.env.PORT || 3000; // Usar variable de entorno o puerto 3000 por defecto

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Ruta de prueba básica
app.get('/', (req: Request, res: Response) => {
  res.send('¡API de Agencia de Desarrollo funcionando!');
});

// 👇 2. Monta el router de usuarios en la ruta base '/users'
app.use('/users', userRoutes);
app.use('/catalog', catalogRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`⚡️[server]: Servidor corriendo en http://localhost:${port}`);
});