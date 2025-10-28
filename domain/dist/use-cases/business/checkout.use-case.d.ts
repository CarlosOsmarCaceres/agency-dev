import { ICartRepository } from '../../repositories/cart.repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { IInvoiceRepository } from '../../repositories/invoice.repository.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { Project } from '../../entities/business/project.js';
export interface CheckoutInput {
    actingUserId: string;
}
export declare class CheckoutUseCase {
    private userRepository;
    private clientRepository;
    private cartRepository;
    private serviceRepository;
    private projectRepository;
    private invoiceRepository;
    constructor(userRepository: IUserRepository, clientRepository: IClientRepository, cartRepository: ICartRepository, serviceRepository: IServiceRepository, projectRepository: IProjectRepository, invoiceRepository: IInvoiceRepository);
    execute(input: CheckoutInput): Promise<Project>;
}
//# sourceMappingURL=checkout.use-case.d.ts.map