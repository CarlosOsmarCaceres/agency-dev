/* import {  Provision  } from '../../../domain/Dist/index.js';
import {  User  } from '../../../domain/Dist/index.js';
import { UserRole  } from '../../../domain/Dist/index.js';
import {  Cart  } from '../../../domain/Dist/index.js'; */
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import catalogRoutes from './routes/catalog.routes.js';
import cartRoutes from './routes/cart.routes.js'; 
import projectRoutes from './routes/project.routes.js';
import financeRoutes from './routes/finance.routes.js';


// Crear la aplicación Express
const app: Express = express();
const port = process.env.PORT || 3000; // Usar variable de entorno o puerto 3000 por defecto

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Ruta de prueba básica
app.get('/', (req: Request, res: Response) => {
  res.send('¡API de Agencia de Desarrollo funcionando!');
});

// 👇 2. Monta el router de proyectos
app.use('/users', userRoutes);
app.use('/catalog', catalogRoutes);
app.use('/cart', cartRoutes);
app.use('/projects', projectRoutes);
app.use('/finance', financeRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`⚡️[server]: Servidor corriendo en http://localhost:${port}`);
});