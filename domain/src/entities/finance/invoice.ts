import { Entity } from "../../utils/type/entity.js";
import { Client } from "../users/client.js";
import { Project } from "../business/project.js";

export const InvoiceStatuses = {
    DRAFT: "Borrador",      // Creada pero no enviada
    PENDING: "Pendiente",   // Enviada, esperando pago
    PAID: "Pagada",         // El pago fue completado
    OVERDUE: "Vencida",     // Pasó la fecha de vencimiento
    CANCELLED: "Anulada",
} as const;

export type InvoiceStatus = (typeof InvoiceStatuses)[keyof typeof InvoiceStatuses];

// Representa un documento de cobro enviado a un cliente.
export interface Invoice extends Entity {
    clientId: Client['id'];
    projectId: Project['id']; // La factura está vinculada a un proyecto.

    amount: number;         // El monto a pagar.
    status: InvoiceStatus;
    
    issueDate: Date;        // Fecha de emisión.
    dueDate: Date;          // Fecha de vencimiento.
}