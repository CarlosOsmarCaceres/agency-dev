import { Payment } from "../../entities/finance/payment.js";
import { IPaymentRepository } from "../payment.repository.js";
export declare class InMemoryPaymentRepository implements IPaymentRepository {
    payments: Payment[];
    save(payment: Payment): Promise<Payment>;
}
//# sourceMappingURL=in-memory-payment.repository.d.ts.map