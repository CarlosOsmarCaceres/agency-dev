import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateCategoryUseCase } from './update-category.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { Category } from '../../entities/catalog/category.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryCategoryRepository } from '../../repositories/__mocks__/in-memory-category.repository.js';

describe('Update Category Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let categoryRepository: InMemoryCategoryRepository;
    let updateCategoryUseCase: UpdateCategoryUseCase;
    let adminUser: User, clientUser: User;
    let category: Category;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        categoryRepository = new InMemoryCategoryRepository();
        updateCategoryUseCase = new UpdateCategoryUseCase(userRepository, categoryRepository);

        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        clientUser = { id: 'client-1', name: 'Client', role: UserRoles.CLIENT, email: 'c@c.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(clientUser);

        category = { id: 'cat-1', name: 'Nombre Viejo', description: 'Descripcion Vieja' };
        await categoryRepository.save(category);
    });

    it('should allow an admin to update a category', async () => {
        const input = {
            actingUserId: 'admin-1',
            categoryId: 'cat-1',
            data: { name: 'Nombre Nuevo' }
        };

        const updatedCategory = await updateCategoryUseCase.execute(input);
        expect(updatedCategory.name).toBe('Nombre Nuevo');
        expect(updatedCategory.description).toBe('Descripcion Vieja'); // No cambió
    });

    it('should NOT allow a client to update a category', async () => {
        const input = {
            actingUserId: 'client-1',
            categoryId: 'cat-1',
            data: { name: 'Hack' }
        };
        
        await expect(updateCategoryUseCase.execute(input)).rejects.toThrow('Authorization failed');
    });

    it('should throw an error if category does not exist', async () => {
        const input = {
            actingUserId: 'admin-1',
            categoryId: 'non-existent',
            data: { name: 'New' }
        };
        
        await expect(updateCategoryUseCase.execute(input)).rejects.toThrow('Category not found');
    });
});