import { v4 as uuidv4 } from 'uuid';
import { UserRoles } from '../../entities/users/user.js';
import { Project } from '../../entities/business/project.js';
import { Invoice, InvoiceStatuses } from '../../entities/finance/invoice.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IInvoiceRepository } from '../../repositories/invoice.repository.js';

// DTO de entrada
export interface CreateManualInvoiceInput {
    actingUserId: string;
    projectId: string;
    amount: number;
    description?: string; // Descripción opcional
}

export class CreateManualInvoiceUseCase {
    constructor(
        private userRepository: IUserRepository,
        private projectRepository: IProjectRepository,
        private invoiceRepository: IInvoiceRepository
    ) {}

    async execute(input: CreateManualInvoiceInput): Promise<Invoice> {
        const { actingUserId, projectId, amount, description } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('Acting user not found.');

        // --- LÓGICA DE AUTORIZACIÓN ---
        if (actingUser.role !== UserRoles.ADMIN) {
            throw new Error('Authorization failed: Only administrators can create manual invoices.');
        }

        const project = await this.projectRepository.findById(projectId);
        if (!project) throw new Error('Project not found.');

        // --- ACCIÓN ---
        const newInvoice: Invoice = {
            id: uuidv4(),
            clientId: project.clientId, // Tomamos el clientId del proyecto
            projectId: project.id,
            amount: amount,
            status: InvoiceStatuses.PENDING, // Las facturas manuales nacen pendientes
            issueDate: new Date(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 15)), // Vence en 15 días (configurable)
            // Podríamos añadir la descripción aquí si la entidad Invoice la tuviera
        };

        await this.invoiceRepository.save(newInvoice);
        
        return newInvoice;
    }
}