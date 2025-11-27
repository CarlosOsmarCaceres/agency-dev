import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteServiceUseCase } from './delete-service.use-case.js';
import { UserRoles } from '../../entities/users/user.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryServiceRepository } from '../../repositories/__mocks__/in-memory-service.repository.js';
describe('Delete Service Use Case', () => {
    let userRepository;
    let serviceRepository;
    let deleteServiceUseCase;
    let adminUser, salesUser;
    let service;
    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        serviceRepository = new InMemoryServiceRepository();
        deleteServiceUseCase = new DeleteServiceUseCase(userRepository, serviceRepository);
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        salesUser = { id: 'sales-1', name: 'Sales', role: UserRoles.SALESPERSON, email: 's@s.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(salesUser);
        service = { id: 'service-1', name: 'Web a Borrar', price: 100, categoryId: 'cat-1', description: '...' };
        await serviceRepository.save(service);
    });
    it('should allow an admin to delete a service', async () => {
        const input = { actingUserId: 'admin-1', serviceId: 'service-1' };
        await deleteServiceUseCase.execute(input);
        const deletedService = await serviceRepository.findById('service-1');
        expect(deletedService).toBeNull();
    });
    it('should NOT allow a salesperson to delete a service', async () => {
        const input = { actingUserId: 'sales-1', serviceId: 'service-1' };
        await expect(deleteServiceUseCase.execute(input)).rejects.toThrow('Authorization failed');
    });
    it('should throw an error if service does not exist', async () => {
        const input = { actingUserId: 'admin-1', serviceId: 'non-existent' };
        await expect(deleteServiceUseCase.execute(input)).rejects.toThrow('Service not found');
    });
});
//# sourceMappingURL=delete-service.use-case.spec.js.map