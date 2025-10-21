"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceStatuses = void 0;
exports.InvoiceStatuses = {
    DRAFT: "Borrador", // Creada pero no enviada
    PENDING: "Pendiente", // Enviada, esperando pago
    PAID: "Pagada", // El pago fue completado
    OVERDUE: "Vencida", // Pasó la fecha de vencimiento
    CANCELLED: "Anulada",
};
//# sourceMappingURL=invoice.js.map