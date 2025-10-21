import { Entity } from "../../utils/type/entity.js";
import { Invoice } from "./invoice.js";
export declare const PaymentMethods: {
    readonly CREDIT_CARD: "Tarjeta de Crédito";
    readonly BANK_TRANSFER: "Transferencia Bancaria";
    readonly MERCADO_PAGO: "Mercado Pago";
};
export type PaymentMethod = (typeof PaymentMethods)[keyof typeof PaymentMethods];
export interface Payment extends Entity {
    invoiceId: Invoice['id'];
    amount: number;
    paymentDate: Date;
    method: PaymentMethod;
    transactionId?: string;
}
//# sourceMappingURL=payment.d.ts.map