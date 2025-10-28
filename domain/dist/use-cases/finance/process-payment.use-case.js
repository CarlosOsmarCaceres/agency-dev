import { v4 as uuidv4 } from 'uuid';
import { InvoiceStatuses } from '../../entities/finance/invoice.js';
export class ProcessPaymentUseCase {
    invoiceRepository;
    paymentRepository;
    constructor(invoiceRepository, paymentRepository) {
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;
    }
    async execute(input) {
        const { invoiceId, amount, method, transactionId } = input;
        const invoice = await this.invoiceRepository.findById(invoiceId);
        if (!invoice)
            throw new Error('Invoice not found.');
        // --- VALIDACIONES ---
        if (invoice.status !== InvoiceStatuses.PENDING) {
            throw new Error('Invoice is not pending.');
        }
        if (amount < invoice.amount) {
            throw new Error('Payment amount is less than the invoice amount.');
        }
        // --- ACCIÓN ---
        // 1. Crear el registro de pago
        const newPayment = {
            id: uuidv4(),
            invoiceId: invoice.id,
            amount: amount, // Guardamos el monto pagado, aunque sea mayor (podría haber propinas, etc.)
            paymentDate: new Date(),
            method: method,
            transactionId: transactionId,
        };
        await this.paymentRepository.save(newPayment);
        // 2. Actualizar el estado de la factura
        invoice.status = InvoiceStatuses.PAID;
        await this.invoiceRepository.update(invoice);
        return newPayment;
    }
}
//# sourceMappingURL=process-payment.use-case.js.map