import { describe, it, expect, beforeEach } from 'vitest';
import { ProcessPaymentUseCase } from './process-payment.use-case.js';
import { InvoiceStatuses } from '../../entities/finance/invoice.js';
import { PaymentMethods } from '../../entities/finance/payment.js';
import { InMemoryInvoiceRepository } from '../../repositories/__mocks__/in-memory-invoice.repository.js';
import { InMemoryPaymentRepository } from '../../repositories/__mocks__/in-memory-payment.repository.js';
describe('Process Payment Use Case', () => {
    let invoiceRepository;
    let paymentRepository;
    let processPaymentUseCase;
    let pendingInvoice;
    beforeEach(async () => {
        invoiceRepository = new InMemoryInvoiceRepository();
        paymentRepository = new InMemoryPaymentRepository();
        processPaymentUseCase = new ProcessPaymentUseCase(invoiceRepository, paymentRepository);
        // -- Datos de Prueba --
        pendingInvoice = { id: 'inv-1', clientId: 'client-1', projectId: 'proj-1', amount: 100, status: InvoiceStatuses.PENDING, issueDate: new Date(), dueDate: new Date() };
        await invoiceRepository.save(pendingInvoice);
    });
    it('should successfully process a payment for a pending invoice', async () => {
        const input = {
            invoiceId: 'inv-1',
            amount: 100,
            method: PaymentMethods.CREDIT_CARD,
            transactionId: 'txn_12345'
        };
        const payment = await processPaymentUseCase.execute(input);
        // 1. Verificamos que se creó el registro de pago
        expect(payment.id).toBeDefined();
        expect(payment.invoiceId).toBe('inv-1');
        expect(payment.amount).toBe(100);
        expect(paymentRepository.payments.length).toBe(1);
        // 2. Verificamos que la factura se marcó como pagada
        const updatedInvoice = await invoiceRepository.findById('inv-1');
        expect(updatedInvoice?.status).toBe(InvoiceStatuses.PAID);
    });
    it('should throw an error if the invoice does not exist', async () => {
        const input = { invoiceId: 'non-existent-inv', amount: 100, method: PaymentMethods.CREDIT_CARD };
        await expect(processPaymentUseCase.execute(input)).rejects.toThrow('Invoice not found.');
    });
    it('should throw an error if the invoice is not pending', async () => {
        // Marcamos la factura como pagada primero
        pendingInvoice.status = InvoiceStatuses.PAID;
        await invoiceRepository.update(pendingInvoice); // Necesitaremos este método
        const input = { invoiceId: 'inv-1', amount: 100, method: PaymentMethods.CREDIT_CARD };
        await expect(processPaymentUseCase.execute(input)).rejects.toThrow('Invoice is not pending.');
    });
    it('should throw an error if the paid amount is less than the invoice amount', async () => {
        const input = { invoiceId: 'inv-1', amount: 50, method: PaymentMethods.CREDIT_CARD }; // Monto insuficiente
        await expect(processPaymentUseCase.execute(input)).rejects.toThrow('Payment amount is less than the invoice amount.');
    });
});
//# sourceMappingURL=process-payment.use-case.spec.js.map