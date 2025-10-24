import { Invoice } from "../../entities/finance/invoice.js";
import { IInvoiceRepository } from "../invoice.repository.js";
export class InMemoryInvoiceRepository implements IInvoiceRepository {
    public invoices: Invoice[] = [];

    update(invoice: Invoice): Promise<Invoice> {
        const index = this.invoices.findIndex(inv => inv.id === invoice.id);
        if (index !== -1) {
            this.invoices[index] = { ...this.invoices[index], ...invoice };
        }
        return Promise.resolve(this.invoices[index]!); // Usamos '!' porque asumimos que existe
    }

    async findById(id: string): Promise<Invoice | null> {
        return this.invoices.find(inv => inv.id === id) || null;
    }

    async findByClientId(clientId: string): Promise<Invoice[]> {
        return this.invoices.filter(inv => inv.clientId === clientId);
    }

    async save(invoice: Invoice): Promise<Invoice> {
        this.invoices.push(invoice);
        return invoice;
    }
}