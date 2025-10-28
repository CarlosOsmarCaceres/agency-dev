import { v4 as uuidv4 } from 'uuid';
import { CartStatuses } from '../../entities/business/cart.js';
import { ProjectStatuses } from '../../entities/business/project.js';
import { InvoiceStatuses } from '../../entities/finance/invoice.js';
export class CheckoutUseCase {
    userRepository;
    clientRepository;
    cartRepository;
    serviceRepository;
    projectRepository;
    invoiceRepository;
    constructor(userRepository, clientRepository, cartRepository, serviceRepository, projectRepository, invoiceRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.cartRepository = cartRepository;
        this.serviceRepository = serviceRepository;
        this.projectRepository = projectRepository;
        this.invoiceRepository = invoiceRepository;
    }
    async execute(input) {
        const user = await this.userRepository.findById(input.actingUserId);
        if (!user)
            throw new Error('User not found.');
        const client = await this.clientRepository.findByUserId(user.id);
        if (!client)
            throw new Error('Client profile not found.');
        const cart = await this.cartRepository.findActiveByClientId(client.id);
        if (!cart)
            throw new Error('No active cart found for this user.');
        if (!cart.serviceId)
            throw new Error('Cannot checkout an empty cart.');
        const service = await this.serviceRepository.findById(cart.serviceId);
        if (!service)
            throw new Error('Service in cart not found.');
        // 1. Crear el Proyecto
        const newProject = {
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
        const newInvoice = {
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
//# sourceMappingURL=checkout.use-case.js.map