import { Router } from 'express';
// Controladores existentes
import { registerUserController } from '../controllers/register-user.controller.js';
import { loginController } from '../controllers/login.controller.js';
import { getUserProfileController } from '../controllers/get-user-profile.controller.js';
import { updateUserProfileController } from '../controllers/update-user-profile.controller.js';
import { listUsersController } from '../controllers/list-users.controller.js';

// 👇 Nuevos Controladores
import { getUserByIdController } from '../controllers/get-user-by-id.controller.js';
import { updateUserRoleController } from '../controllers/update-user-role.controller.js';
import { deleteUserController } from '../controllers/delete-user.controller.js';

// Middlewares
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

// --- Rutas Públicas ---
router.post('/register', registerUserController);
router.post('/login', loginController);

// --- Rutas Protegidas (Usuario Autenticado) ---
router.get('/profile', authMiddleware, getUserProfileController);
router.patch('/:id', authMiddleware, updateUserProfileController); // Actualizar perfil propio (o admin a otro)

// --- Rutas Administrativas (Solo Admin) ---
// Es importante el orden: rutas específicas antes de rutas con parámetros genéricos si hay conflicto
// Pero aquí '/:id' y '/' son distintos, así que está bien.

router.get('/', authMiddleware, adminMiddleware, listUsersController);
router.get('/:id', authMiddleware, adminMiddleware, getUserByIdController);
router.patch('/:id/role', authMiddleware, adminMiddleware, updateUserRoleController);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUserController);

export default router;