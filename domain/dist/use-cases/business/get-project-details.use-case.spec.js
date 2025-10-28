import { describe, it, expect, beforeEach } from 'vitest';
import { GetProjectDetailsUseCase, } from './get-project-details.use-case.js';
import { UserRoles } from '../../entities/users/user.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryClientRepository } from '../../repositories/__mocks__/in-memory-client.repository.js';
import { InMemoryProjectRepository } from '../../repositories/__mocks__/in-memory-project.repository.js';
import { InMemoryServiceRepository } from '../../repositories/__mocks__/in-memory-service.repository.js';
describe('Get Project Details Use Case', () => {
    let userRepository;
    let clientRepository;
    let projectRepository;
    let serviceRepository;
    let getProjectDetailsUseCase;
    let adminUser, clientUser1, clientUser2;
    let client1, project1, service1;
    beforeEach(async () => {
        // Inicialización de Mocks
        userRepository = new InMemoryUserRepository();
        clientRepository = new InMemoryClientRepository();
        projectRepository = new InMemoryProjectRepository();
        serviceRepository = new InMemoryServiceRepository();
        getProjectDetailsUseCase = new GetProjectDetailsUseCase(userRepository, clientRepository, projectRepository, serviceRepository);
        // -- Creación de Datos de Prueba --
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        clientUser1 = { id: 'user-1', name: 'John Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };
        clientUser2 = { id: 'user-2', name: 'Jane Doe', role: UserRoles.CLIENT, email: 'jane@d.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(clientUser1);
        await userRepository.save(clientUser2);
        client1 = { id: 'client-1', userId: 'user-1', contactPhone: '111' };
        await clientRepository.save(client1);
        service1 = { id: 'service-1', name: 'Web Básica', price: 500, categoryId: 'cat-1', description: '...' };
        await serviceRepository.save(service1);
        project1 = { id: 'proj-1', name: 'Proyecto de John', clientId: 'client-1', serviceId: 'service-1', finalPrice: 500, status: 'En Progreso', maintenancePlanId: null, startDate: new Date(), estimatedCompletionDate: new Date() };
        await projectRepository.save(project1);
    });
    it('should allow a client to get details of their own project', async () => {
        const input = { actingUserId: 'user-1', projectId: 'proj-1' };
        const details = await getProjectDetailsUseCase.execute(input);
        expect(details).not.toBeNull();
        expect(details.project.id).toBe('proj-1');
        // Verificamos el "enriquecimiento"
        expect(details.service?.name).toBe('Web Básica');
    });
    it('should allow an admin to get details of any project', async () => {
        const input = { actingUserId: 'admin-1', projectId: 'proj-1' };
        const details = await getProjectDetailsUseCase.execute(input);
        expect(details).not.toBeNull();
        expect(details.project.id).toBe('proj-1');
    });
    it('should NOT allow a client to get details of another client project', async () => {
        const input = { actingUserId: 'user-2', projectId: 'proj-1' };
        await expect(getProjectDetailsUseCase.execute(input)).rejects.toThrow('Authorization failed.');
    });
    it('should return null if the project does not exist', async () => {
        const input = { actingUserId: 'admin-1', projectId: 'non-existent-proj' };
        const details = await getProjectDetailsUseCase.execute(input);
        expect(details).toBeNull();
    });
});
//# sourceMappingURL=get-project-details.use-case.spec.js.map