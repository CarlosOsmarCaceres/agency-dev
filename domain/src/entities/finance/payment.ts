import { Entity } from "../../utils/type/entity";
import { Invoice } from "./invoice";

export const PaymentMethods = {
    CREDIT_CARD: "Tarjeta de Crédito",
    BANK_TRANSFER: "Transferencia Bancaria",
    MERCADO_PAGO: "Mercado Pago",
} as const;

export type PaymentMethod = (typeof PaymentMethods)[keyof typeof PaymentMethods];

// Representa una transacción de pago recibida.
export interface Payment extends Entity {
    invoiceId: Invoice['id']; // A qué factura corresponde este pago.

    amount: number;           // Monto pagado.
    paymentDate: Date;
    method: PaymentMethod;
    
    // ID de la transacción del proveedor de pagos (ej. Mercado Pago)
    transactionId?: string; 
}