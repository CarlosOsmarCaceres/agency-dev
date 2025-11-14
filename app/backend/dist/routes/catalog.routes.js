import { Router } from 'express';
// Importamos el controlador que acabamos de crear
import { listCategoriesController } from '../controllers/list-categories.controller.js';
import { createCategoryController } from '../controllers/create-category.controller.js';
import { listServicesController } from '../controllers/list-services.controller.js';
import { createServiceController } from '../controllers/create-service.controller.js';
import { updateServiceController } from '../controllers/update-service.controller.js';
// Importamos los middlewares necesarios
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { salesMiddleware } from '../middlewares/sales.middleware.js';
//Importa el guardia de Admin
import { adminMiddleware } from '../middlewares/admin.middleware.js';
const router = Router();
// --- Rutas Públicas ---
// [GET] /catalog/categories
router.get('/categories', listCategoriesController);
// (Aquí añadiremos más rutas del catálogo después, ej. GET /services)
router.get('/services', listServicesController);
router.post('/categories', authMiddleware, salesMiddleware, createCategoryController);
router.patch('/services/:id', authMiddleware, salesMiddleware, updateServiceController);
// --- Rutas Protegidas (Solo Admin) ---
router.post('/services', authMiddleware, adminMiddleware, createServiceController);
export default router;
