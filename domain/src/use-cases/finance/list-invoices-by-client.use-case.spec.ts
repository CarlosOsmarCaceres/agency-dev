import { describe, it, expect, beforeEach } from 'vitest';
import { ListInvoicesByClientUseCase } from './list-invoices-by-client.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { Client } from '../../entities/users/client.js';
import { Invoice, InvoiceStatuses } from '../../entities/finance/invoice.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryClientRepository } from '../../repositories/__mocks__/in-memory-client.repository.js';
import { InMemoryInvoiceRepository } from '../../repositories/__mocks__/in-memory-invoice.repository.js';

describe('List Invoices By Client Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let clientRepository: InMemoryClientRepository;
    let invoiceRepository: InMemoryInvoiceRepository;
    let listInvoicesByClientUseCase: ListInvoicesByClientUseCase;

    let adminUser: User, salespersonUser: User, clientUser1: User, clientUser2: User;
    let client1: Client, client2: Client;
    let invoice1: Invoice, invoice2: Invoice; // Facturas para client1

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        clientRepository = new InMemoryClientRepository();
        invoiceRepository = new InMemoryInvoiceRepository();
        listInvoicesByClientUseCase = new ListInvoicesByClientUseCase(userRepository, clientRepository, invoiceRepository);

        // -- Datos de Prueba --
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

        // Facturas solo para el cliente 1
        invoice1 = { id: 'inv-1', clientId: 'client-1', projectId: 'proj-1', amount: 100, status: InvoiceStatuses.PENDING, issueDate: new Date(), dueDate: new Date() };
        invoice2 = { id: 'inv-2', clientId: 'client-1', projectId: 'proj-2', amount: 200, status: InvoiceStatuses.PAID, issueDate: new Date(), dueDate: new Date() };
        await invoiceRepository.save(invoice1);
        await invoiceRepository.save(invoice2);
    });

    it('should allow a client to list their own invoices', async () => {
        const input = { actingUserId: 'user-1', clientId: 'client-1' };
        const invoices = await listInvoicesByClientUseCase.execute(input);
        expect(invoices.length).toBe(2);
        expect(invoices[0]!.amount).toBe(100);
    });

    it('should allow an admin to list invoices for any client', async () => {
        const input = { actingUserId: 'admin-1', clientId: 'client-1' };
        const invoices = await listInvoicesByClientUseCase.execute(input);
        expect(invoices.length).toBe(2);
    });

    it('should allow a salesperson to list invoices for any client', async () => {
        const input = { actingUserId: 'sales-1', clientId: 'client-1' };
        const invoices = await listInvoicesByClientUseCase.execute(input);
        expect(invoices.length).toBe(2);
    });

    it('should NOT allow a client to list invoices for another client', async () => {
        const input = { actingUserId: 'user-2', clientId: 'client-1' }; // Jane intentando ver facturas de John
        await expect(listInvoicesByClientUseCase.execute(input)).rejects.toThrow('Authorization failed.');
    });

    it('should return an empty array if the client has no invoices', async () => {
        const input = { actingUserId: 'user-2', clientId: 'client-2' }; // Jane no tiene facturas
        const invoices = await listInvoicesByClientUseCase.execute(input);
        expect(invoices.length).toBe(0);
    });
});