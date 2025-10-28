import { IInvoiceRepository } from '../../repositories/invoice.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { Invoice } from '../../entities/finance/invoice.js';
export interface ListInvoicesByClientInput {
    actingUserId: string;
    clientId: string;
}
export declare class ListInvoicesByClientUseCase {
    private userRepository;
    private clientRepository;
    private invoiceRepository;
    constructor(userRepository: IUserRepository, clientRepository: IClientRepository, invoiceRepository: IInvoiceRepository);
    execute(input: ListInvoicesByClientInput): Promise<Invoice[]>;
}
//# sourceMappingURL=list-invoices-by-client.use-case.d.ts.map