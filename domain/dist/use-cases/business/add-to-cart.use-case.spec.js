import { describe, it, expect, beforeEach } from 'vitest';
import { AddToCartUseCase } from './add-to-cart.use-case.js';
import { UserRoles } from '../../entities/users/user.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryClientRepository } from '../../repositories/__mocks__/in-memory-client.repository.js';
import { InMemoryServiceRepository } from '../../repositories/__mocks__/in-memory-service.repository.js';
import { InMemoryMaintenancePlanRepository } from '../../repositories/__mocks__/in-memory-maintenance-plan.repository.js';
import { InMemoryCartRepository } from '../../repositories/__mocks__/in-memory-cart.repository.js';
describe('Add To Cart Use Case', () => {
    let userRepository;
    let clientRepository;
    let serviceRepository;
    let maintenancePlanRepository;
    let cartRepository;
    let addToCartUseCase;
    let clientUser, client;
    let service, plan;
    beforeEach(async () => {
        // Inicialización de todos los repositorios y el caso de uso
        userRepository = new InMemoryUserRepository();
        clientRepository = new InMemoryClientRepository();
        serviceRepository = new InMemoryServiceRepository();
        maintenancePlanRepository = new InMemoryMaintenancePlanRepository();
        cartRepository = new InMemoryCartRepository();
        addToCartUseCase = new AddToCartUseCase(userRepository, clientRepository, serviceRepository, maintenancePlanRepository, cartRepository);
        // Creación de datos de prueba
        clientUser = { id: 'user-1', name: 'John Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };
        client = { id: 'client-1', userId: 'user-1', contactPhone: '123' };
        service = { id: 'service-1', name: 'Web Básica', price: 500, categoryId: 'cat-1', description: '...' };
        plan = { id: 'plan-1', level: 'INICIAL', monthlyPrice: 50, description: '...', features: [] };
        await userRepository.save(clientUser);
        await clientRepository.save(client); // Asumimos un método save en el mock
        await serviceRepository.save(service);
        await maintenancePlanRepository.save(plan); // Asumimos un método save en el mock
    });
    it('should create a new cart and add a service if one does not exist', async () => {
        const input = {
            actingUserId: 'user-1',
            serviceId: 'service-1'
        };
        const cart = await addToCartUseCase.execute(input);
        expect(cart.id).toBeDefined();
        expect(cart.clientId).toBe('client-1');
        expect(cart.serviceId).toBe('service-1');
        expect(cart.maintenancePlanId).toBeNull();
        expect(cartRepository.carts.length).toBe(1);
    });
    it('should create a new cart with a service and a maintenance plan', async () => {
        const input = {
            actingUserId: 'user-1',
            serviceId: 'service-1',
            maintenancePlanId: 'plan-1'
        };
        const cart = await addToCartUseCase.execute(input);
        expect(cart.serviceId).toBe('service-1');
        expect(cart.maintenancePlanId).toBe('plan-1');
    });
    it('should update an existing active cart', async () => {
        // Creamos un carrito inicial
        const initialInput = { actingUserId: 'user-1', serviceId: 'service-1' };
        await addToCartUseCase.execute(initialInput);
        // Creamos un nuevo servicio para actualizar
        const newService = { id: 'service-2', name: 'Web Avanzada', price: 1000, categoryId: 'cat-1', description: '...' };
        await serviceRepository.save(newService);
        // Actualizamos el carrito con el nuevo servicio
        const updateInput = { actingUserId: 'user-1', serviceId: 'service-2', maintenancePlanId: 'plan-1' };
        const updatedCart = await addToCartUseCase.execute(updateInput);
        expect(updatedCart.serviceId).toBe('service-2');
        expect(updatedCart.maintenancePlanId).toBe('plan-1');
        expect(cartRepository.carts.length).toBe(1); // Nos aseguramos de no haber creado un carrito nuevo
    });
    it('should throw an error if service does not exist', async () => {
        const input = { actingUserId: 'user-1', serviceId: 'non-existent-service' };
        await expect(addToCartUseCase.execute(input)).rejects.toThrow('Service not found.');
    });
});
//# sourceMappingURL=add-to-cart.use-case.spec.js.map