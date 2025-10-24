import { Invoice } from "../entities/finance/invoice.js";

export interface IInvoiceRepository {

    
    update(invoice: Invoice): Promise<Invoice>;
    findById(id: string): Promise<Invoice | null>;
    findByClientId(clientId: string): Promise<Invoice[]>;
    save(invoice: Invoice): Promise<Invoice>;


}