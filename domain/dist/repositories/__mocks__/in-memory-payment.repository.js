export class InMemoryPaymentRepository {
    payments = [];
    async save(payment) {
        this.payments.push(payment);
        return payment;
    }
}
//# sourceMappingURL=in-memory-payment.repository.js.map