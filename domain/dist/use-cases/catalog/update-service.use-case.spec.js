import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateServiceUseCase } from './update-service.use-case.js';
import { UserRoles } from '../../entities/users/user.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryServiceRepository } from '../../repositories/__mocks__/in-memory-service.repository.js';
describe('Update Service Use Case', () => {
    let userRepository;
    let serviceRepository;
    let updateServiceUseCase;
    let adminUser, salespersonUser, clientUser;
    let existingService;
    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        serviceRepository = new InMemoryServiceRepository();
        updateServiceUseCase = new UpdateServiceUseCase(userRepository, serviceRepository);
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        salespersonUser = { id: 'sales-1', name: 'Sales', role: UserRoles.SALESPERSON, email: 's@s.com', passwordHash: 'h', createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'Client', role: UserRoles.CLIENT, email: 'c@c.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(salespersonUser);
        await userRepository.save(clientUser);
        existingService = { id: 'service-1', name: 'Web Básica', description: '...', price: 500, categoryId: 'cat-1' };
        await serviceRepository.save(existingService);
    });
    it('should allow an admin to update a service', async () => {
        const input = {
            actingUserId: 'admin-1',
            serviceId: 'service-1',
            data: { name: 'Web Básica (Actualizada)', price: 550 }
        };
        const updatedService = await updateServiceUseCase.execute(input);
        expect(updatedService.name).toBe('Web Básica (Actualizada)');
        expect(updatedService.price).toBe(550);
    });
    it('should allow a salesperson to update a service', async () => {
        const input = {
            actingUserId: 'sales-1',
            serviceId: 'service-1',
            data: { description: 'Nueva descripción.' }
        };
        const updatedService = await updateServiceUseCase.execute(input);
        expect(updatedService.description).toBe('Nueva descripción.');
    });
    it('should NOT allow a client to update a service', async () => {
        const input = {
            actingUserId: 'client-1',
            serviceId: 'service-1',
            data: { price: 10 }
        };
        await expect(updateServiceUseCase.execute(input)).rejects.toThrow('Authorization failed.');
    });
    it('should throw an error if the service to update is not found', async () => {
        const input = {
            actingUserId: 'admin-1',
            serviceId: 'non-existent-id',
            data: { name: '...' }
        };
        await expect(updateServiceUseCase.execute(input)).rejects.toThrow('Service not found.');
    });
});
//# sourceMappingURL=update-service.use-case.spec.js.map