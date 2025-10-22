import { describe, it, expect, beforeEach } from 'vitest';
import { CreateCategoryUseCase } from './create-category.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { Category } from '../../entities/catalog/category.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { ICategoryRepository } from '../../repositories/category.repository.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryCategoryRepository } from '../../repositories/__mocks__/in-memory-category.repository.js';

describe('Create Category Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let categoryRepository: InMemoryCategoryRepository;
    let createCategoryUseCase: CreateCategoryUseCase;
    let adminUser: User;
    let clientUser: User;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        categoryRepository = new InMemoryCategoryRepository();
        createCategoryUseCase = new CreateCategoryUseCase(userRepository, categoryRepository);

        // Creamos usuarios de prueba
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'John Doe', role: UserRoles.CLIENT, email: 'j@d.com', passwordHash: 'h', createdAt: new Date() };

        await userRepository.save(adminUser);
        await userRepository.save(clientUser);
    });

    it('should allow an admin to create a new category', async () => {
        const input = {
            actingUserId: 'admin-1',
            name: 'Web Corporativa',
            description: 'Sitios web para empresas e instituciones.'
        };

        const category = await createCategoryUseCase.execute(input);

        expect(category.id).toBeDefined();
        expect(category.name).toBe('Web Corporativa');
        expect(categoryRepository.categories.length).toBe(1);
    });

    it('should NOT allow a non-admin to create a category', async () => {
        const input = {
            actingUserId: 'client-1',
            name: 'Web Corporativa',
            description: 'Sitios web para empresas e instituciones.'
        };

        await expect(createCategoryUseCase.execute(input)).rejects.toThrow('Authorization failed.');
    });

    it('should throw an error if a category with the same name already exists', async () => {
        // Creamos una categoría primero
        await createCategoryUseCase.execute({
            actingUserId: 'admin-1',
            name: 'Tienda Online',
            description: 'E-commerce completo.'
        });

        // Intentamos crear otra con el mismo nombre
        const input = {
            actingUserId: 'admin-1',
            name: 'Tienda Online',
            description: 'Otra descripción.'
        };
        
        await expect(createCategoryUseCase.execute(input)).rejects.toThrow('Category with this name already exists.');
    });
});