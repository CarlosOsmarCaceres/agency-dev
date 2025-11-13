import { Router } from 'express';
// Importamos el controlador que acabamos de crear
import { listCategoriesController } from '../controllers/list-categories.controller.js';
import { createCategoryController } from '../controllers/create-category.controller.js';
import { listServicesController } from '../controllers/list-services.controller.js';

// Importamos los middlewares necesarios
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { salesMiddleware } from '../middlewares/sales.middleware.js';

const router = Router();

// --- Rutas Públicas ---
// [GET] /catalog/categories
router.get('/categories', listCategoriesController);

// (Aquí añadiremos más rutas del catálogo después, ej. GET /services)

router.get('/services', listServicesController);

router.post('/categories', authMiddleware, salesMiddleware, createCategoryController);  
export default router;