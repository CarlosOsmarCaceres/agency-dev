import { describe, it, expect, beforeEach } from 'vitest';
import { CreateManualInvoiceUseCase } from './create-manual-invoice.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { Project } from '../../entities/business/project.js';
import { InvoiceStatuses } from '../../entities/finance/invoice.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryProjectRepository } from '../../repositories/__mocks__/in-memory-project.repository.js';
import { InMemoryInvoiceRepository } from '../../repositories/__mocks__/in-memory-invoice.repository.js';

describe('Create Manual Invoice Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let projectRepository: InMemoryProjectRepository;
    let invoiceRepository: InMemoryInvoiceRepository;
    let createManualInvoiceUseCase: CreateManualInvoiceUseCase;

    let adminUser: User, clientUser: User;
    let project: Project;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        projectRepository = new InMemoryProjectRepository();
        invoiceRepository = new InMemoryInvoiceRepository();
        createManualInvoiceUseCase = new CreateManualInvoiceUseCase(userRepository, projectRepository, invoiceRepository);

        // -- Datos de Prueba --
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'Client', role: UserRoles.CLIENT, email: 'c@c.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(clientUser);

        project = { id: 'proj-1', name: 'Proyecto Existente', clientId: 'client-1', serviceId: 's-1', finalPrice: 500, status: 'En Progreso', maintenancePlanId: null, startDate: new Date(), estimatedCompletionDate: new Date() };
        await projectRepository.save(project);
    });

    it('should allow an admin to create a manual invoice for a project', async () => {
        const input = {
            actingUserId: 'admin-1',
            projectId: 'proj-1',
            amount: 150,
            description: 'Cargo por hora extra' // Descripción opcional
        };

        const invoice = await createManualInvoiceUseCase.execute(input);

        expect(invoice.id).toBeDefined();
        expect(invoice.projectId).toBe('proj-1');
        expect(invoice.amount).toBe(150);
        expect(invoice.status).toBe(InvoiceStatuses.PENDING);
        expect(invoiceRepository.invoices.length).toBe(1);
    });

    it('should NOT allow a non-admin to create a manual invoice', async () => {
        const input = { actingUserId: 'client-1', projectId: 'proj-1', amount: 50 };
        await expect(createManualInvoiceUseCase.execute(input)).rejects.toThrow('Authorization failed: Only administrators can create manual invoices.');
    });

    it('should throw an error if the project does not exist', async () => {
        const input = { actingUserId: 'admin-1', projectId: 'non-existent-proj', amount: 100 };
        await expect(createManualInvoiceUseCase.execute(input)).rejects.toThrow('Project not found.');
    });
});