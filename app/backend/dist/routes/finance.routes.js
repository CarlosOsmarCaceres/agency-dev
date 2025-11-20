import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { processPaymentController } from '../controllers/process-payment.controller.js';
import { listInvoicesByClientController } from '../controllers/list-invoices-by-client.controller.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
import { createManualInvoiceController } from '../controllers/create-manual-invoice.controller.js';
const router = Router();
router.post('/payment/process', processPaymentController);
router.get('/invoices/client/:clientId', authMiddleware, listInvoicesByClientController);
router.post('/invoices/manual', authMiddleware, adminMiddleware, createManualInvoiceController);
// (Aquí añadiremos las rutas de pago y creación manual después)
export default router;
