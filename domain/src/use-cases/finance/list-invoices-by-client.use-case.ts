import { UserRole, UserRoles } from '../../entities/users/user.js';
import { IInvoiceRepository } from '../../repositories/invoice.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { Invoice } from '../../entities/finance/invoice.js';

export interface ListInvoicesByClientInput {
    actingUserId: string;
    clientId: string;
}

export class ListInvoicesByClientUseCase {
    constructor(
        private userRepository: IUserRepository,
        private clientRepository: IClientRepository,
        private invoiceRepository: IInvoiceRepository,
    ) {}

    async execute(input: ListInvoicesByClientInput): Promise<Invoice[]> {
        const { actingUserId, clientId } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('User not found.');

        // --- LÓGICA DE AUTORIZACIÓN ---
        const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        const isPrivilegedUser = allowedRoles.includes(actingUser.role);
        
        let isOwner = false;
        if (!isPrivilegedUser) {
            const clientProfile = await this.clientRepository.findByUserId(actingUser.id);
            isOwner = clientProfile?.id === clientId;
        }

        if (!isPrivilegedUser && !isOwner) {
            throw new Error('Authorization failed.');
        }

        const invoices = await this.invoiceRepository.findByClientId(clientId);
        return invoices;
    }
}