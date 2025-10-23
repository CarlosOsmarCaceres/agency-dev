import { Invoice } from "../entities/finance/invoice.js";
export interface IInvoiceRepository {
    save(invoice: Invoice): Promise<Invoice>;
}