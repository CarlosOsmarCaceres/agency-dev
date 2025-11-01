import { Router } from 'express';
// Importamos el controlador que acabamos de crear
import { listCategoriesController } from '../controllers/list-categories.controller.js';
import { createCategoryController } from '../controllers/create-category.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { salesMiddleware } from '../middlewares/sales.middleware.js';
const router = Router();
// --- Rutas Públicas ---
// [GET] /catalog/categories
router.get('/categories', listCategoriesController);
// (Aquí añadiremos más rutas del catálogo después, ej. GET /services)
router.post('/categories', authMiddleware, salesMiddleware, createCategoryController);
export default router;
