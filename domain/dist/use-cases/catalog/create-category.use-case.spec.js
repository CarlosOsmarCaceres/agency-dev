import { describe, it, expect, beforeEach } from 'vitest';
import { CreateCategoryUseCase } from './create-category.use-case.js';
import { UserRoles } from '../../entities/users/user.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryCategoryRepository } from '../../repositories/__mocks__/in-memory-category.repository.js';
describe('Create Category Use Case', () => {
    let userRepository;
    let categoryRepository;
    let createCategoryUseCase;
    let adminUser;
    let salespersonUser;
    let clientUser;
    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        categoryRepository = new InMemoryCategoryRepository();
        createCategoryUseCase = new CreateCategoryUseCase(userRepository, categoryRepository);
        // ✅ Completamos los datos de los usuarios para que sean válidos
        adminUser = { id: 'admin-1', name: 'Admin', email: 'admin@corp.com', passwordHash: 'hash', role: UserRoles.ADMIN, createdAt: new Date() };
        salespersonUser = { id: 'sales-1', name: 'Sales', email: 'sales@corp.com', passwordHash: 'hash', role: UserRoles.SALESPERSON, createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'John Doe', email: 'john@doe.com', passwordHash: 'hash', role: UserRoles.CLIENT, createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(salespersonUser);
        await userRepository.save(clientUser);
    });
    it('should allow an admin to create a new category', async () => {
        // ✅ Completamos los datos del input
        const input = {
            actingUserId: 'admin-1',
            name: 'Web Corporativa',
            description: 'Sitios para empresas.'
        };
        const category = await createCategoryUseCase.execute(input);
        expect(category.name).toBe('Web Corporativa');
    });
    it('should allow a salesperson to create a new category', async () => {
        const input = {
            actingUserId: 'sales-1',
            name: 'Marketing Digital',
            description: 'Servicios de SEO y SEM.'
        };
        const category = await createCategoryUseCase.execute(input);
        expect(category.name).toBe('Marketing Digital');
        expect(categoryRepository.categories.length).toBe(1);
    });
    it('should NOT allow a client to create a category', async () => {
        // ✅ Completamos los datos del input
        const input = {
            actingUserId: 'client-1',
            name: 'Web Ilegal',
            description: 'Algo que no se debe hacer.'
        };
        await expect(createCategoryUseCase.execute(input)).rejects.toThrow('Authorization failed.');
    });
    // ✅ Implementamos este test que estaba vacío
    it('should throw an error if a category with the same name already exists', async () => {
        // Primero, creamos una categoría
        const initialInput = {
            actingUserId: 'admin-1',
            name: 'Tienda Online',
            description: 'E-commerce completo.'
        };
        await createCategoryUseCase.execute(initialInput);
        // Ahora, intentamos crear otra con el mismo nombre
        const duplicateInput = {
            actingUserId: 'sales-1', // No importa quién lo intente
            name: 'Tienda Online',
            description: 'Otra descripción.'
        };
        await expect(createCategoryUseCase.execute(duplicateInput)).rejects.toThrow('Category with this name already exists.');
    });
});
//# sourceMappingURL=create-category.use-case.spec.js.map