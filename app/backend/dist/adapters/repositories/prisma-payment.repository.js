import { PrismaClient } from '@prisma/client';
// Asumiendo alias o rutas relativas correctas
import { PaymentMethods } from '../../../../../domain/dist/entities/finance/payment.js';
const prisma = new PrismaClient();
// --- Funciones de Traducción ---
/**
 * Traduce el método de pago de Prisma (DB) al Dominio (Negocio)
 */
function toDomainPaymentMethod(prismaMethod) {
    switch (prismaMethod) {
        case 'CREDIT_CARD':
            return PaymentMethods.CREDIT_CARD; // "Tarjeta de Crédito"
        case 'BANK_TRANSFER':
            return PaymentMethods.BANK_TRANSFER; // "Transferencia Bancaria"
        case 'MERCADO_PAGO':
            return PaymentMethods.MERCADO_PAGO; // "Mercado Pago"
        default:
            throw new Error(`Método de pago desconocido: ${prismaMethod}`);
    }
}
/**
 * Traduce el método de pago del Dominio (Negocio) a Prisma (DB)
 */
function toPrismaPaymentMethod(domainMethod) {
    switch (domainMethod) {
        case PaymentMethods.CREDIT_CARD:
            return 'CREDIT_CARD';
        case PaymentMethods.BANK_TRANSFER:
            return 'BANK_TRANSFER';
        case PaymentMethods.MERCADO_PAGO:
            return 'MERCADO_PAGO';
        default:
            throw new Error(`Método de pago de dominio desconocido: ${domainMethod}`);
    }
}
/**
 * Mapea un objeto Payment de Prisma a uno del Dominio
 */
function toDomainPayment(prismaPayment) {
    return {
        id: prismaPayment.id,
        invoiceId: prismaPayment.invoiceId,
        amount: prismaPayment.amount,
        paymentDate: prismaPayment.paymentDate,
        method: toDomainPaymentMethod(prismaPayment.method), // Traduce el enum
        transactionId: prismaPayment.transactionId || undefined, // Convierte null a undefined
    };
}
// --- Fin de Funciones de Traducción ---
export class PrismaPaymentRepository {
    async save(payment) {
        const newPayment = await prisma.payment.create({
            data: {
                id: payment.id, // Asumimos que el ID viene del caso de uso (uuid)
                invoiceId: payment.invoiceId,
                amount: payment.amount,
                paymentDate: payment.paymentDate,
                method: toPrismaPaymentMethod(payment.method), // Traduce el enum
                transactionId: payment.transactionId,
            },
        });
        return toDomainPayment(newPayment);
    }
}
