import { describe, it, expect, beforeEach } from 'vitest';
import { CheckoutUseCase } from './checkout.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { Client } from '../../entities/users/client.js';
import { Service } from '../../entities/catalog/service.js';
import { Cart, CartStatuses } from '../../entities/business/cart.js';
// Importamos todos los Mocks necesarios
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryClientRepository } from '../../repositories/__mocks__/in-memory-client.repository.js';
import { InMemoryServiceRepository } from '../../repositories/__mocks__/in-memory-service.repository.js';
import { InMemoryCartRepository } from '../../repositories/__mocks__/in-memory-cart.repository.js';
import { InMemoryProjectRepository } from '../../repositories/__mocks__/in-memory-project.repository.js';
import { InMemoryInvoiceRepository } from '../../repositories/__mocks__/in-memory-invoice.repository.js';

describe('Checkout Use Case', () => {
    // Declaración de todos los mocks y el caso de uso
    let userRepository: InMemoryUserRepository;
    let clientRepository: InMemoryClientRepository;
    let serviceRepository: InMemoryServiceRepository;
    let cartRepository: InMemoryCartRepository;
    let projectRepository: InMemoryProjectRepository;
    let invoiceRepository: InMemoryInvoiceRepository;
    let checkoutUseCase: CheckoutUseCase;

    beforeEach(async () => {
        // Inicialización de mocks
        userRepository = new InMemoryUserRepository();
        clientRepository = new InMemoryClientRepository();
        serviceRepository = new InMemoryServiceRepository();
        cartRepository = new InMemoryCartRepository();
        projectRepository = new InMemoryProjectRepository();
        invoiceRepository = new InMemoryInvoiceRepository();

        // Inyectamos las dependencias
        checkoutUseCase = new CheckoutUseCase(userRepository, clientRepository, cartRepository, serviceRepository, projectRepository, invoiceRepository);

        // Creación de datos de prueba
        const clientUser = { id: 'user-1', name: 'John Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };
        const client = { id: 'client-1', userId: 'user-1', contactPhone: '123' };
        const service = { id: 'service-1', name: 'Web Básica', price: 500, categoryId: 'cat-1', description: '...' };
        const cart = { id: 'cart-1', clientId: 'client-1', status: CartStatuses.ACTIVE, serviceId: 'service-1', maintenancePlanId: null, createdAt: new Date(), updatedAt: new Date() };

        await userRepository.save(clientUser);
        await clientRepository.save(client);
        await serviceRepository.save(service);
        await cartRepository.save(cart);
    });

    it('should successfully create a project and an invoice from the cart', async () => {
        const input = { actingUserId: 'user-1' };
        const project = await checkoutUseCase.execute(input);

        // 1. Verificamos que el proyecto se haya creado correctamente
        expect(project).toBeDefined();
        expect(project.name).toContain('Web Básica');
        expect(projectRepository.projects.length).toBe(1);
        
        // 2. Verificamos que la factura se haya creado
        expect(invoiceRepository.invoices.length).toBe(1);
        const invoice = invoiceRepository.invoices[0]!;
        expect(invoice.projectId).toBe(project.id);
        expect(invoice.amount).toBe(500);

        // 3. Verificamos que el carrito se haya desactivado
        const cart = await cartRepository.findById('cart-1');
        expect(cart?.status).toBe(CartStatuses.CONVERTED);
    });
    
    it('should throw an error if the user has no active cart', async () => {
        // Creamos un nuevo usuario pero SIN carrito
        const newUser = { id: 'user-2', name: 'Jane Doe', role: UserRoles.CLIENT, email: 'jane@doe.com', passwordHash: 'h', createdAt: new Date() };
        const newClient = { id: 'client-2', userId: 'user-2', contactPhone: '456' };

        await userRepository.save(newUser);
        await clientRepository.save(newClient); // Importante: el perfil de cliente SÍ debe existir

        const input = { actingUserId: 'user-2' };
        await expect(checkoutUseCase.execute(input)).rejects.toThrow('No active cart found for this user.');
    });

    it('should throw an error if the cart is empty', async () => {
        const cart = await cartRepository.findById('cart-1');
        cart!.serviceId = null; // Vaciamos el carrito
        await cartRepository.update(cart!);

        const input = { actingUserId: 'user-1' };
        await expect(checkoutUseCase.execute(input)).rejects.toThrow('Cannot checkout an empty cart.');
    });
});