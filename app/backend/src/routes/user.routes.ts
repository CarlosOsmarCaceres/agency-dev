import { Router } from 'express';
// Importamos los Controladores ("Jefes de Tráfico")
import { registerUserController } from '../controllers/register-user.controller.js';
import { loginController } from '../controllers/login.controller.js';
import { getUserProfileController } from '../controllers/get-user-profile.controller.js';

// Importamos los Middlewares ("Guardias de Seguridad")
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

// --- Rutas Públicas (Sin autenticación) ---
// [POST] /users/register
router.post('/register', registerUserController);

// [POST] /users/login
router.post('/login', loginController);

// --- Rutas Protegidas (Requieren autenticación) ---
// [GET] /users/profile
// 1. Pasa por el guardia 'authMiddleware'.
// 2. Si es válido, pasa al controlador 'getUserProfileController'.
router.get('/profile', authMiddleware, getUserProfileController);

// (Aquí añadiremos las otras rutas de usuario a medida que creemos sus controladores)
// Ejemplo de ruta solo para Admin:
// router.get('/', authMiddleware, adminMiddleware, listUsersController);

export default router;