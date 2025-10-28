import { describe, it, expect, beforeEach } from 'vitest';
import { ViewCartUseCase } from './view-cart.use-case.js';
import { UserRoles } from '../../entities/users/user.js';
import { CartStatuses } from '../../entities/business/cart.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryClientRepository } from '../../repositories/__mocks__/in-memory-client.repository.js';
import { InMemoryServiceRepository } from '../../repositories/__mocks__/in-memory-service.repository.js';
import { InMemoryMaintenancePlanRepository } from '../../repositories/__mocks__/in-memory-maintenance-plan.repository.js';
import { InMemoryCartRepository } from '../../repositories/__mocks__/in-memory-cart.repository.js';
describe('View Cart Use Case', () => {
    let userRepository;
    let clientRepository;
    let serviceRepository;
    let planRepository;
    let cartRepository;
    let viewCartUseCase;
    let clientUser, client, service, plan, cart;
    beforeEach(async () => {
        // Inicialización de repositorios y caso de uso
        userRepository = new InMemoryUserRepository();
        clientRepository = new InMemoryClientRepository();
        serviceRepository = new InMemoryServiceRepository();
        planRepository = new InMemoryMaintenancePlanRepository();
        cartRepository = new InMemoryCartRepository();
        viewCartUseCase = new ViewCartUseCase(userRepository, clientRepository, cartRepository, serviceRepository, planRepository);
        // Creación de datos de prueba
        clientUser = { id: 'user-1', name: 'John Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };
        client = { id: 'client-1', userId: 'user-1', contactPhone: '123' };
        service = { id: 'service-1', name: 'Web Básica', price: 500, categoryId: 'cat-1', description: '...' };
        plan = { id: 'plan-1', level: 'INICIAL', monthlyPrice: 50, description: '...', features: [] };
        cart = { id: 'cart-1', clientId: 'client-1', status: CartStatuses.ACTIVE, serviceId: 'service-1', maintenancePlanId: 'plan-1', createdAt: new Date(), updatedAt: new Date() };
        await userRepository.save(clientUser);
        await clientRepository.save(client);
        await serviceRepository.save(service);
        await planRepository.save(plan);
        await cartRepository.save(cart);
    });
    it('should return the detailed cart for a user', async () => {
        const input = { actingUserId: 'user-1' };
        const detailedCart = await viewCartUseCase.execute(input);
        expect(detailedCart).not.toBeNull();
        expect(detailedCart.id).toBe('cart-1');
        // Verificamos que los datos estén "enriquecidos"
        expect(detailedCart.service).toBeDefined();
        expect(detailedCart.service?.name).toBe('Web Básica');
        expect(detailedCart.maintenancePlan).toBeDefined();
        expect(detailedCart.maintenancePlan?.level).toBe('INICIAL');
    });
    it('should return null if the user has no active cart', async () => {
        // Creamos un nuevo usuario sin carrito
        const newUser = { id: 'user-2', name: 'Jane Doe', role: UserRoles.CLIENT, email: 'jane@doe.com', passwordHash: 'h', createdAt: new Date() };
        const newClient = { id: 'client-2', userId: 'user-2', contactPhone: '456' };
        await userRepository.save(newUser);
        await clientRepository.save(newClient);
        const input = { actingUserId: 'user-2' };
        const result = await viewCartUseCase.execute(input);
        expect(result).toBeNull();
    });
    it('should throw an error if the user is not found', async () => {
        const input = { actingUserId: 'non-existent-user' };
        await expect(viewCartUseCase.execute(input)).rejects.toThrow('User not found.');
    });
});
//# sourceMappingURL=view-cart.use-case.spec.js.map