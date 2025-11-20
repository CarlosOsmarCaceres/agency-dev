import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
// Importamos el controlador
import { listInvoicesByClientController } from '../controllers/list-invoices-by-client.controller.js';
const router = Router();
// [GET] /finance/invoices/client/:clientId
// Permite: ADMIN, VENDEDOR, o el CLIENTE dueño del perfil
router.get('/invoices/client/:clientId', authMiddleware, listInvoicesByClientController);
// (Aquí añadiremos las rutas de pago y creación manual después)
export default router;
