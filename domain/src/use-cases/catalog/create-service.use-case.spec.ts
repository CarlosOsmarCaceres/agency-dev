import { describe, it, expect, beforeEach } from 'vitest';
import { CreateServiceUseCase } from './create-service.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { Category } from '../../entities/catalog/category.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryCategoryRepository } from '../../repositories/__mocks__/in-memory-category.repository.js';
import { InMemoryServiceRepository } from '../../repositories/__mocks__/in-memory-service.repository.js';

describe('Create Service Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let categoryRepository: InMemoryCategoryRepository;
    let serviceRepository: InMemoryServiceRepository;
    let createServiceUseCase: CreateServiceUseCase;
    let adminUser: User;
    let salespersonUser: User;
    let existingCategory: Category;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        categoryRepository = new InMemoryCategoryRepository();
        serviceRepository = new InMemoryServiceRepository();
        createServiceUseCase = new CreateServiceUseCase(userRepository, categoryRepository, serviceRepository);

        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        salespersonUser = { id: 'sales-1', name: 'Sales', role: UserRoles.SALESPERSON, email: 's@s.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(salespersonUser);

        existingCategory = { id: 'cat-1', name: 'Web Corporativa', description: '...' };
        await categoryRepository.save(existingCategory);
    });

    it('should allow an admin to create a new service', async () => {
        const input = {
            actingUserId: 'admin-1',
            name: 'Página Web Básica',
            description: 'Una página simple de 3 secciones.',
            price: 500,
            categoryId: 'cat-1'
        };

        const service = await createServiceUseCase.execute(input);

        expect(service.id).toBeDefined();
        expect(service.name).toBe('Página Web Básica');
        expect(service.price).toBe(500);
        expect(serviceRepository.services.length).toBe(1);
    });

    it('should NOT allow a salesperson to create a service', async () => {
        const input = {
            actingUserId: 'sales-1',
            name: 'Servicio no autorizado',
            description: '...',
            price: 100,
            categoryId: 'cat-1'
        };

        await expect(createServiceUseCase.execute(input)).rejects.toThrow('Authorization failed: Only administrators can create services.');
    });

    it('should throw an error if the category does not exist', async () => {
        const input = {
            actingUserId: 'admin-1',
            name: 'Servicio para categoría fantasma',
            description: '...',
            price: 200,
            categoryId: 'non-existent-cat-id'
        };

        await expect(createServiceUseCase.execute(input)).rejects.toThrow('Category not found.');
    });
});