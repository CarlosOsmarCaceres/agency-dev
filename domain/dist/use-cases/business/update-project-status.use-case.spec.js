import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateProjectStatusUseCase } from './update-project-status.use-case.js';
import { UserRoles } from '../../entities/users/user.js';
import { ProjectStatuses } from '../../entities/business/project.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryProjectRepository } from '../../repositories/__mocks__/in-memory-project.repository.js';
describe('Update Project Status Use Case', () => {
    let userRepository;
    let projectRepository;
    let updateProjectStatusUseCase;
    let adminUser, salespersonUser, clientUser;
    let project;
    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        projectRepository = new InMemoryProjectRepository();
        updateProjectStatusUseCase = new UpdateProjectStatusUseCase(userRepository, projectRepository);
        // -- Test Data --
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        salespersonUser = { id: 'sales-1', name: 'Sales Lead', role: UserRoles.SALESPERSON, email: 's@s.com', passwordHash: 'h', createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'Client', role: UserRoles.CLIENT, email: 'c@c.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(salespersonUser);
        await userRepository.save(clientUser);
        project = { id: 'proj-1', name: 'Project Alpha', clientId: 'client-1', serviceId: 's-1', finalPrice: 500, status: ProjectStatuses.IN_PROGRESS, maintenancePlanId: null, startDate: new Date(), estimatedCompletionDate: new Date() };
        await projectRepository.save(project);
    });
    it('should allow an admin to update a project status', async () => {
        const input = { actingUserId: 'admin-1', projectId: 'proj-1', newStatus: ProjectStatuses.COMPLETED };
        const updatedProject = await updateProjectStatusUseCase.execute(input);
        expect(updatedProject.status).toBe(ProjectStatuses.COMPLETED);
    });
    it('should allow a salesperson to update a project status', async () => {
        const input = { actingUserId: 'sales-1', projectId: 'proj-1', newStatus: ProjectStatuses.CANCELLED };
        const updatedProject = await updateProjectStatusUseCase.execute(input);
        expect(updatedProject.status).toBe(ProjectStatuses.CANCELLED);
    });
    it('should NOT allow a client to update a project status', async () => {
        const input = { actingUserId: 'client-1', projectId: 'proj-1', newStatus: ProjectStatuses.COMPLETED };
        await expect(updateProjectStatusUseCase.execute(input)).rejects.toThrow('Authorization failed.');
    });
    it('should throw an error if the project does not exist', async () => {
        const input = { actingUserId: 'admin-1', projectId: 'non-existent-proj', newStatus: ProjectStatuses.PENDING };
        await expect(updateProjectStatusUseCase.execute(input)).rejects.toThrow('Project not found.');
    });
    // Optional but good practice: test invalid status
    it('should throw an error if the new status is invalid', async () => {
        const input = { actingUserId: 'admin-1', projectId: 'proj-1', newStatus: 'INVALID_STATUS' }; // Force invalid type for test
        await expect(updateProjectStatusUseCase.execute(input)).rejects.toThrow('Invalid project status.');
    });
});
//# sourceMappingURL=update-project-status.use-case.spec.js.map