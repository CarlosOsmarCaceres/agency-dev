import { Payment } from "../../entities/finance/payment.js";
import { IPaymentRepository } from "../payment.repository.js";

export class InMemoryPaymentRepository implements IPaymentRepository {
    public payments: Payment[] = [];
    
    async save(payment: Payment): Promise<Payment> {
        this.payments.push(payment);
        return payment;
    }
}