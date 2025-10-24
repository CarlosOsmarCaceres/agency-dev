import { Invoice } from "../../entities/finance/invoice.js";
import { IInvoiceRepository } from "../invoice.repository.js";
export class InMemoryInvoiceRepository implements IInvoiceRepository {
    public invoices: Invoice[] = [];

    async findByClientId(clientId: string): Promise<Invoice[]> {
        return this.invoices.filter(inv => inv.clientId === clientId);
    }

    async save(invoice: Invoice): Promise<Invoice> {
        this.invoices.push(invoice);
        return invoice;
    }
}