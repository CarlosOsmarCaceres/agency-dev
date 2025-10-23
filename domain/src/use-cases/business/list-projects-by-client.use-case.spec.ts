import { describe, it, expect, beforeEach } from 'vitest';
import { ListProjectsByClientUseCase } from './list-projects-by-client.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { Client } from '../../entities/users/client.js';
import { Project } from '../../entities/business/project.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryClientRepository } from '../../repositories/__mocks__/in-memory-client.repository.js';
import { InMemoryProjectRepository } from '../../repositories/__mocks__/in-memory-project.repository.js';

describe('List Projects By Client Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let clientRepository: InMemoryClientRepository;
    let projectRepository: InMemoryProjectRepository;
    let listProjectsByClientUseCase: ListProjectsByClientUseCase;

    let adminUser: User, salespersonUser: User, clientUser1: User, clientUser2: User;
    let client1: Client, client2: Client;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        clientRepository = new InMemoryClientRepository();
        projectRepository = new InMemoryProjectRepository();
        // Ahora el caso de uso también necesita el clientRepository para la autorización
        listProjectsByClientUseCase = new ListProjectsByClientUseCase(userRepository, clientRepository, projectRepository);

        // -- Creación de datos de prueba --
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        salespersonUser = { id: 'sales-1', name: 'Sales', role: UserRoles.SALESPERSON, email: 's@s.com', passwordHash: 'h', createdAt: new Date() };
        clientUser1 = { id: 'user-1', name: 'John Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };
        clientUser2 = { id: 'user-2', name: 'Jane Doe', role: UserRoles.CLIENT, email: 'jane@d.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(salespersonUser);
        await userRepository.save(clientUser1);
        await userRepository.save(clientUser2);

        client1 = { id: 'client-1', userId: 'user-1', contactPhone: '111' };
        client2 = { id: 'client-2', userId: 'user-2', contactPhone: '222' };
        await clientRepository.save(client1);
        await clientRepository.save(client2);

        // Proyectos solo para el cliente 1
        await projectRepository.save({ id: 'proj-1', name: 'Proyecto de John', clientId: 'client-1', serviceId: 's-1', finalPrice: 100, status: 'Completado', maintenancePlanId: null, startDate: new Date(), estimatedCompletionDate: new Date() });
        await projectRepository.save({ id: 'proj-2', name: 'Otro proyecto de John', clientId: 'client-1', serviceId: 's-2', finalPrice: 200, status: 'En Progreso', maintenancePlanId: null, startDate: new Date(), estimatedCompletionDate: new Date() });
    });

    it('should allow a client to list their own projects', async () => {
        const input = { actingUserId: 'user-1', clientId: 'client-1' };
        const projects = await listProjectsByClientUseCase.execute(input);
        expect(projects.length).toBe(2);
    });

    it('should allow an admin to list projects for any client', async () => {
        const input = { actingUserId: 'admin-1', clientId: 'client-1' };
        const projects = await listProjectsByClientUseCase.execute(input);
        expect(projects.length).toBe(2);
    });
    
    it('should allow a salesperson to list projects for any client', async () => {
        const input = { actingUserId: 'sales-1', clientId: 'client-1' };
        const projects = await listProjectsByClientUseCase.execute(input);
        expect(projects.length).toBe(2);
    });

    it('should NOT allow a client to list projects for another client', async () => {
        const input = { actingUserId: 'user-2', clientId: 'client-1' }; // Jane (user-2) intentando ver los proyectos de John (client-1)
        await expect(listProjectsByClientUseCase.execute(input)).rejects.toThrow('Authorization failed.');
    });

    it('should return an empty array if the client has no projects', async () => {
        const input = { actingUserId: 'user-2', clientId: 'client-2' }; // Jane (client-2) no tiene proyectos
        const projects = await listProjectsByClientUseCase.execute(input);
        expect(projects.length).toBe(0);
    });
});