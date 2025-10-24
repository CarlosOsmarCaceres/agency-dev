import { describe, it, expect, beforeEach } from 'vitest';
import { AssignUserToProjectUseCase } from './assign-user-to-project.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { Project } from '../../entities/business/project.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryProjectRepository } from '../../repositories/__mocks__/in-memory-project.repository.js';

describe('Assign User To Project Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let projectRepository: InMemoryProjectRepository;
    let assignUserToProjectUseCase: AssignUserToProjectUseCase;

    let adminUser: User, salespersonUser: User, clientUser: User, userToAssign: User;
    let project: Project;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        projectRepository = new InMemoryProjectRepository();
        assignUserToProjectUseCase = new AssignUserToProjectUseCase(userRepository, projectRepository);

        // -- Datos de Prueba --
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        salespersonUser = { id: 'sales-1', name: 'Sales Lead', role: UserRoles.SALESPERSON, email: 's@s.com', passwordHash: 'h', createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'Client', role: UserRoles.CLIENT, email: 'c@c.com', passwordHash: 'h', createdAt: new Date() };
        userToAssign = { id: 'user-assign', name: 'Assigned User', role: UserRoles.SALESPERSON, email: 'assign@s.com', passwordHash: 'h', createdAt: new Date() }; // Otro vendedor para asignar

        await userRepository.save(adminUser);
        await userRepository.save(salespersonUser);
        await userRepository.save(clientUser);
        await userRepository.save(userToAssign);

        project = { id: 'proj-1', name: 'Proyecto Sin Asignar', clientId: 'client-1', serviceId: 's-1', finalPrice: 500, status: 'En Progreso', maintenancePlanId: null, startDate: new Date(), estimatedCompletionDate: new Date() };
        await projectRepository.save(project);
    });

    it('should allow an admin to assign a user to a project', async () => {
        const input = { actingUserId: 'admin-1', projectId: 'proj-1', userIdToAssign: 'user-assign' };
        const updatedProject = await assignUserToProjectUseCase.execute(input);
        expect(updatedProject.assignedToId).toBe('user-assign');
    });

    it('should allow a salesperson to assign a user to a project', async () => {
        const input = { actingUserId: 'sales-1', projectId: 'proj-1', userIdToAssign: 'user-assign' };
        const updatedProject = await assignUserToProjectUseCase.execute(input);
        expect(updatedProject.assignedToId).toBe('user-assign');
    });

    it('should NOT allow a client to assign a user', async () => {
        const input = { actingUserId: 'client-1', projectId: 'proj-1', userIdToAssign: 'user-assign' };
        await expect(assignUserToProjectUseCase.execute(input)).rejects.toThrow('Authorization failed.');
    });

    it('should throw an error if the project does not exist', async () => {
        const input = { actingUserId: 'admin-1', projectId: 'non-existent-proj', userIdToAssign: 'user-assign' };
        await expect(assignUserToProjectUseCase.execute(input)).rejects.toThrow('Project not found.');
    });

    it('should throw an error if the user to assign does not exist', async () => {
        const input = { actingUserId: 'admin-1', projectId: 'proj-1', userIdToAssign: 'non-existent-user' };
        await expect(assignUserToProjectUseCase.execute(input)).rejects.toThrow('User to assign not found.');
    });

    it('should throw an error if trying to assign a user with Client role', async () => {
        const input = { actingUserId: 'admin-1', projectId: 'proj-1', userIdToAssign: 'client-1' }; // Intentando asignar un cliente
        await expect(assignUserToProjectUseCase.execute(input)).rejects.toThrow('Cannot assign a user with Client role to a project.');
    });
});