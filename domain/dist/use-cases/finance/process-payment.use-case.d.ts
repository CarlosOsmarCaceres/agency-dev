import { Payment, PaymentMethod } from '../../entities/finance/payment.js';
import { IInvoiceRepository } from '../../repositories/invoice.repository.js';
import { IPaymentRepository } from '../../repositories/payment.repository.js';
export interface ProcessPaymentInput {
    invoiceId: string;
    amount: number;
    method: PaymentMethod;
    transactionId?: string;
}
export declare class ProcessPaymentUseCase {
    private invoiceRepository;
    private paymentRepository;
    constructor(invoiceRepository: IInvoiceRepository, paymentRepository: IPaymentRepository);
    execute(input: ProcessPaymentInput): Promise<Payment>;
}
//# sourceMappingURL=process-payment.use-case.d.ts.map