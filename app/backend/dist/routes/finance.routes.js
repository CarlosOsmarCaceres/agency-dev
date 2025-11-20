import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { processPaymentController } from '../controllers/process-payment.controller.js';
// Importamos el controlador
import { listInvoicesByClientController } from '../controllers/list-invoices-by-client.controller.js';
const router = Router();
router.post('/payment/process', processPaymentController);
router.get('/invoices/client/:clientId', authMiddleware, listInvoicesByClientController);
// (Aquí añadiremos las rutas de pago y creación manual después)
export default router;
