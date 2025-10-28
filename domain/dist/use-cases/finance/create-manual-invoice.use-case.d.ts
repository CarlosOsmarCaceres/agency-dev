import { Invoice } from '../../entities/finance/invoice.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IInvoiceRepository } from '../../repositories/invoice.repository.js';
export interface CreateManualInvoiceInput {
    actingUserId: string;
    projectId: string;
    amount: number;
    description?: string;
}
export declare class CreateManualInvoiceUseCase {
    private userRepository;
    private projectRepository;
    private invoiceRepository;
    constructor(userRepository: IUserRepository, projectRepository: IProjectRepository, invoiceRepository: IInvoiceRepository);
    execute(input: CreateManualInvoiceInput): Promise<Invoice>;
}
//# sourceMappingURL=create-manual-invoice.use-case.d.ts.map