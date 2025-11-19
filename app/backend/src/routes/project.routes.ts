import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { salesMiddleware } from '../middlewares/sales.middleware.js'; 
// Controladores
import { listProjectsByClientController } from '../controllers/list-projects-by-client.controller.js';
import { getProjectDetailsController } from '../controllers/get-project-details.controller.js';

const router = Router();

// [GET] /projects/client/:clientId
// Permite: ADMIN, VENDEDOR (ver cualquier cliente) o el CLIENTE (ver su propio ID)
router.get('/client/:clientId', authMiddleware, listProjectsByClientController);
router.get('/:projectId', authMiddleware, getProjectDetailsController);

// (Aquí añadiremos las otras rutas de proyecto después)

export default router;