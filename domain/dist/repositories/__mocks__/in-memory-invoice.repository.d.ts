import { Invoice } from "../../entities/finance/invoice.js";
import { IInvoiceRepository } from "../invoice.repository.js";
export declare class InMemoryInvoiceRepository implements IInvoiceRepository {
    invoices: Invoice[];
    update(invoice: Invoice): Promise<Invoice>;
    findById(id: string): Promise<Invoice | null>;
    findByClientId(clientId: string): Promise<Invoice[]>;
    save(invoice: Invoice): Promise<Invoice>;
}
//# sourceMappingURL=in-memory-invoice.repository.d.ts.map