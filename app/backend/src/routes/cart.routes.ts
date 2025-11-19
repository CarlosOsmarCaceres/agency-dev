import { Router } from 'express';
// Controladores
import { addToCartController } from '../controllers/add-to-cart.controller.js';
import { checkoutController } from '../controllers/checkout.controller.js';

// Middlewares ("Guardias")
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// --- Rutas Protegidas (Solo Clientes logueados) ---

// [POST] /cart/add
// Todas las rutas del carrito deben estar protegidas por el authMiddleware
router.post('/add', authMiddleware, addToCartController);
// Ruta de Checkout
router.post('/checkout', authMiddleware, checkoutController);

// (Aquí añadiremos GET /cart y DELETE /cart después)

export default router;