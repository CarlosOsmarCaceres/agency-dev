import { Payment } from "../entities/finance/payment.js";
export interface IPaymentRepository {
    save(payment: Payment): Promise<Payment>;
}
//# sourceMappingURL=payment.repository.d.ts.map