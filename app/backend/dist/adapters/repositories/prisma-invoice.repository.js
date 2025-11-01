import { PrismaClient } from '@prisma/client';
// 👇 Ajusta estas rutas si usas alias o si tu estructura es diferente 👇
import { InvoiceStatuses } from '../../../../../domain/dist/entities/finance/invoice.js';
const prisma = new PrismaClient();
// --- Funciones de Traducción ---
/**
 * Traduce el estado de la factura de Prisma (DB) al Dominio (Negocio)
 */
function toDomainInvoiceStatus(prismaStatus) {
    switch (prismaStatus) {
        case 'DRAFT':
            return InvoiceStatuses.DRAFT; // "Borrador"
        case 'PENDING':
            return InvoiceStatuses.PENDING; // "Pendiente"
        case 'PAID':
            return InvoiceStatuses.PAID; // "Pagada"
        case 'OVERDUE':
            return InvoiceStatuses.OVERDUE; // "Vencida"
        case 'CANCELLED':
            return InvoiceStatuses.CANCELLED; // "Anulada"
        default:
            throw new Error(`Estado de factura desconocido: ${prismaStatus}`);
    }
}
/**
 * Traduce el estado de la factura del Dominio (Negocio) a Prisma (DB)
 */
function toPrismaInvoiceStatus(domainStatus) {
    switch (domainStatus) {
        case InvoiceStatuses.DRAFT:
            return 'DRAFT';
        case InvoiceStatuses.PENDING:
            return 'PENDING';
        case InvoiceStatuses.PAID:
            return 'PAID';
        case InvoiceStatuses.OVERDUE:
            return 'OVERDUE';
        case InvoiceStatuses.CANCELLED:
            return 'CANCELLED';
        default:
            throw new Error(`Estado de factura de dominio desconocido: ${domainStatus}`);
    }
}
/**
 * Mapea un objeto Invoice de Prisma a uno del Dominio
 */
function toDomainInvoice(prismaInvoice) {
    return {
        id: prismaInvoice.id,
        clientId: prismaInvoice.clientId,
        projectId: prismaInvoice.projectId,
        amount: prismaInvoice.amount,
        status: toDomainInvoiceStatus(prismaInvoice.status), // Traduce el enum
        issueDate: prismaInvoice.issueDate,
        dueDate: prismaInvoice.dueDate,
    };
}
// --- Fin de Funciones de Traducción ---
export class PrismaInvoiceRepository {
    async findById(id) {
        const invoice = await prisma.invoice.findUnique({
            where: { id },
        });
        return invoice ? toDomainInvoice(invoice) : null;
    }
    async findByClientId(clientId) {
        const invoices = await prisma.invoice.findMany({
            where: { clientId },
        });
        return invoices.map(toDomainInvoice);
    }
    async save(invoice) {
        const newInvoice = await prisma.invoice.create({
            data: {
                id: invoice.id, // Asumimos que el ID viene del caso de uso (uuid)
                clientId: invoice.clientId,
                projectId: invoice.projectId,
                amount: invoice.amount,
                status: toPrismaInvoiceStatus(invoice.status), // Traduce el enum
                issueDate: invoice.issueDate,
                dueDate: invoice.dueDate,
            },
        });
        return toDomainInvoice(newInvoice);
    }
    async update(invoice) {
        const updatedInvoice = await prisma.invoice.update({
            where: { id: invoice.id },
            data: {
                // Generalmente solo se actualiza el estado
                status: toPrismaInvoiceStatus(invoice.status),
                // Podríamos permitir actualizar otros campos si fuera necesario
                amount: invoice.amount,
                dueDate: invoice.dueDate,
            },
        });
        return toDomainInvoice(updatedInvoice);
    }
}
