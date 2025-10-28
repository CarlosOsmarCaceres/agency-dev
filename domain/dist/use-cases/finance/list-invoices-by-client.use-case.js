import { UserRoles } from '../../entities/users/user.js';
export class ListInvoicesByClientUseCase {
    userRepository;
    clientRepository;
    invoiceRepository;
    constructor(userRepository, clientRepository, invoiceRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.invoiceRepository = invoiceRepository;
    }
    async execute(input) {
        const { actingUserId, clientId } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('User not found.');
        // --- LÓGICA DE AUTORIZACIÓN ---
        const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON];
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
//# sourceMappingURL=list-invoices-by-client.use-case.js.map