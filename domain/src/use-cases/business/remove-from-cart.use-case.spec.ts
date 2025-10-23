import { describe, it, expect, beforeEach } from 'vitest';
import { RemoveFromCartUseCase, RemoveFromCartInput } from './remove-from-cart.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { Client } from '../../entities/users/client.js';
import { Cart, CartStatuses } from '../../entities/business/cart.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryClientRepository } from '../../repositories/__mocks__/in-memory-client.repository.js';
import { InMemoryCartRepository } from '../../repositories/__mocks__/in-memory-cart.repository.js';

describe('Remove From Cart Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let clientRepository: InMemoryClientRepository;
    let cartRepository: InMemoryCartRepository;
    let removeFromCartUseCase: RemoveFromCartUseCase;
    let clientUser: User, client: Client, cart: Cart;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        clientRepository = new InMemoryClientRepository();
        cartRepository = new InMemoryCartRepository();
        removeFromCartUseCase = new RemoveFromCartUseCase(userRepository, clientRepository, cartRepository);

        clientUser = { id: 'user-1', name: 'John Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };
        client = { id: 'client-1', userId: 'user-1', contactPhone: '123' };
        cart = { id: 'cart-1', clientId: 'client-1', status: CartStatuses.ACTIVE, serviceId: 'service-1', maintenancePlanId: 'plan-1', createdAt: new Date(), updatedAt: new Date() };

        await userRepository.save(clientUser);
        await clientRepository.save(client);
        await cartRepository.save(cart);
    });

    it('should remove only the maintenance plan from the cart', async () => {
        const input: RemoveFromCartInput = {
            actingUserId: 'user-1',
            itemToRemove: 'maintenancePlan'
        };

        const updatedCart = await removeFromCartUseCase.execute(input);

        expect(updatedCart).not.toBeNull();
        expect(updatedCart!.serviceId).toBe('service-1'); // El servicio principal debe permanecer
        expect(updatedCart!.maintenancePlanId).toBeNull(); // El plan debe ser nulo
    });

    it('should remove both the service and maintenance plan from the cart', async () => {
        const input : RemoveFromCartInput = {
            actingUserId: 'user-1',
            itemToRemove: 'service'
        };

        const updatedCart = await removeFromCartUseCase.execute(input);

        expect(updatedCart).not.toBeNull();
        expect(updatedCart!.serviceId).toBeNull();
        expect(updatedCart!.maintenancePlanId).toBeNull();
    });

    it('should return null if the user has no active cart', async () => {
        const newUser = { id: 'user-2', name: 'Jane Doe', role: UserRoles.CLIENT, email: 'jane@doe.com', passwordHash: 'h', createdAt: new Date() };
        const newClient = { id: 'client-2', userId: 'user-2', contactPhone: '456' };
        await userRepository.save(newUser);
        await clientRepository.save(newClient);

        const input: RemoveFromCartInput = { actingUserId: 'user-2', itemToRemove: 'service' };
        const result = await removeFromCartUseCase.execute(input);

        expect(result).toBeNull();
    });
});