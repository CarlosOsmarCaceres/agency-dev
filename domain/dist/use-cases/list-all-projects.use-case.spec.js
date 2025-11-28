import { describe, it, expect, beforeEach } from 'vitest';
import { ListAllProjectsUseCase } from './list-all-projects.use-case.js';
import { UserRoles } from '../../entities/users/user.entity.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryProjectRepository } from '../../repositories/__mocks__/in-memory-project.repository.js';
describe('List All Projects Use Case', () => {
    let userRepository;
    let projectRepository;
    let listAllProjectsUseCase;
    let adminUser, clientUser;
    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        projectRepository = new InMemoryProjectRepository();
        listAllProjectsUseCase = new ListAllProjectsUseCase(userRepository, projectRepository);
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'Client', role: UserRoles.CLIENT, email: 'c@c.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(clientUser);
        // Guardamos proyectos
        await projectRepository.save({ id: 'p1', name: 'P1', clientId: 'c1', serviceId: 's1', finalPrice: 100, status: 'Pendiente', maintenancePlanId: null, startDate: new Date(), estimatedCompletionDate: new Date() });
        await projectRepository.save({ id: 'p2', name: 'P2', clientId: 'c2', serviceId: 's1', finalPrice: 200, status: 'En Progreso', maintenancePlanId: null, startDate: new Date(), estimatedCompletionDate: new Date() });
    });
    it('should allow an admin to see all projects', async () => {
        const projects = await listAllProjectsUseCase.execute({ actingUserId: 'admin-1' });
        expect(projects.length).toBe(2);
    });
    it('should NOT allow a client to see all projects', async () => {
        await expect(listAllProjectsUseCase.execute({ actingUserId: 'client-1' }))
            .rejects.toThrow('Authorization failed');
    });
});
//# sourceMappingURL=list-all-projects.use-case.spec.js.map