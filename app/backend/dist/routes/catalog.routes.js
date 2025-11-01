import { Router } from 'express';
// Importamos el controlador que acabamos de crear
import { listCategoriesController } from '../controllers/list-categories.controller.js';
const router = Router();
// --- Rutas Públicas ---
// [GET] /catalog/categories
router.get('/categories', listCategoriesController);
// (Aquí añadiremos más rutas del catálogo después, ej. GET /services)
export default router;
