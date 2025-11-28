import { Router } from 'express';
// Controladores
import { listCategoriesController } from '../controllers/list-categories.controller.js';
import { createCategoryController } from '../controllers/create-category.controller.js';
import { listServicesController } from '../controllers/list-services.controller.js';
import { createServiceController } from '../controllers/create-service.controller.js';
import { updateServiceController } from '../controllers/update-service.controller.js';
import { deleteServiceController } from '../controllers/delete-service.controller.js';
// 👇 IMPORTAR CONTROLADORES DE CATEGORÍA QUE FALTABAN
import { updateCategoryController } from '../controllers/update-category.controller.js';
import { deleteCategoryController } from '../controllers/delete-category.controller.js';

// Middlewares
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { salesMiddleware } from '../middlewares/sales.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

// --- Rutas Públicas ---
router.get('/categories', listCategoriesController);
router.get('/services', listServicesController);

// --- Rutas Protegidas (Servicios) ---
router.post('/services', authMiddleware, adminMiddleware, createServiceController);
router.patch('/services/:id', authMiddleware, salesMiddleware, updateServiceController);
router.delete('/services/:id', authMiddleware, adminMiddleware, deleteServiceController);

// --- Rutas Protegidas (Categorías) ---
router.post('/categories', authMiddleware, salesMiddleware, createCategoryController);

// 👇 ESTA ES LA RUTA QUE TE FALTA PARA EDITAR 👇
router.patch('/categories/:id', authMiddleware, salesMiddleware, updateCategoryController);

// 👇 ESTA ES LA RUTA PARA BORRAR 👇
router.delete('/categories/:id', authMiddleware, adminMiddleware, deleteCategoryController);

export default router;