import { Router } from 'express';
// Importamos los Controladores ("Jefes de Tráfico")
import { registerUserController } from '../controllers/register-user.controller.js';
import { loginController } from '../controllers/login.controller.js';
import { getUserProfileController } from '../controllers/get-user-profile.controller.js';
import { updateUserProfileController } from '../controllers/update-user-profile.controller.js';
import { listUsersController } from '../controllers/list-users.controller.js';
// Importamos los Middlewares ("Guardias de Seguridad")
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
const router = Router();
router.post('/register', registerUserController);
router.post('/login', loginController);
router.get('/profile', authMiddleware, getUserProfileController);
router.patch('/:id', authMiddleware, updateUserProfileController);
router.get('/', authMiddleware, adminMiddleware, listUsersController);
export default router;
