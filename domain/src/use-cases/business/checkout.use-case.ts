import { v4 as uuidv4 } from 'uuid';
import { ICartRepository } from '../../repositories/cart.repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { IInvoiceRepository } from '../../repositories/invoice.repository.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { CartStatuses } from '../../entities/business/cart.js';
import { Project, ProjectStatuses } from '../../entities/business/project.js';
import { Invoice, InvoiceStatuses } from '../../entities/finance/invoice.js';

export interface CheckoutInput {
    actingUserId: string;
}

export class CheckoutUseCase {
    constructor(
        private userRepository: IUserRepository,
        private clientRepository: IClientRepository,
        private cartRepository: ICartRepository,
        private serviceRepository: IServiceRepository,
        private projectRepository: IProjectRepository,
        private invoiceRepository: IInvoiceRepository,
    ) {}

    async execute(input: CheckoutInput): Promise<Project> {
        const user = await this.userRepository.findById(input.actingUserId);
        if (!user) throw new Error('User not found.');
        
        const client = await this.clientRepository.findByUserId(user.id);
        if (!client) throw new Error('Client profile not found.');

        const cart = await this.cartRepository.findActiveByClientId(client.id);
        if (!cart) throw new Error('No active cart found for this user.');
        
        if (!cart.serviceId) throw new Error('Cannot checkout an empty cart.');

        const service = await this.serviceRepository.findById(cart.serviceId);
        if (!service) throw new Error('Service in cart not found.');

        // 1. Crear el Proyecto
        const newProject: Project = {
            id: uuidv4(),
            name: `Proyecto para ${client.companyName || user.name} - ${service.name}`,
            clientId: client.id,
            serviceId: service.id,
            maintenancePlanId: cart.maintenancePlanId,
            status: ProjectStatuses.PENDING,
            finalPrice: service.price, // Aquí podrías agregar lógica de descuentos o precios de planes
            startDate: new Date(),
            estimatedCompletionDate: new Date(), // Esto debería ser calculado en un futuro
        };
        await this.projectRepository.save(newProject);

        // 2. Crear la Factura
        const newInvoice: Invoice = {
            id: uuidv4(),
            clientId: client.id,
            projectId: newProject.id,
            amount: newProject.finalPrice,
            status: InvoiceStatuses.PENDING,
            issueDate: new Date(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 15)), // Vence en 15 días
        };
        await this.invoiceRepository.save(newInvoice);

        // 3. Desactivar el Carrito
        cart.status = CartStatuses.CONVERTED;
        await this.cartRepository.update(cart);
        
        return newProject;
    }
}