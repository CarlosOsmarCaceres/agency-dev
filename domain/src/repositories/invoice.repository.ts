import { Invoice } from "../entities/finance/invoice.js";
export interface IInvoiceRepository {
    findByClientId(clientId: string): Promise<Invoice[]>;
    save(invoice: Invoice): Promise<Invoice>;
}