import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteCategoryUseCase } from './delete-category.use-case.js';
import { User, UserRoles } from '../../entities/users/user.js';
import { Category } from '../../entities/catalog/category.js';
import { InMemoryUserRepository } from '../../repositories/__mocks__/in-memory-user.repository.js';
import { InMemoryCategoryRepository } from '../../repositories/__mocks__/in-memory-category.repository.js';

describe('Delete Category Use Case', () => {
    let userRepository: InMemoryUserRepository;
    let categoryRepository: InMemoryCategoryRepository;
    let deleteCategoryUseCase: DeleteCategoryUseCase;
    let adminUser: User, salesUser: User;
    let category: Category;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        categoryRepository = new InMemoryCategoryRepository();
        deleteCategoryUseCase = new DeleteCategoryUseCase(userRepository, categoryRepository);

        // Crear Usuarios
        adminUser = { id: 'admin-1', name: 'Admin', role: UserRoles.ADMIN, email: 'a@a.com', passwordHash: 'h', createdAt: new Date() };
        salesUser = { id: 'sales-1', name: 'Sales', role: UserRoles.SALESPERSON, email: 's@s.com', passwordHash: 'h', createdAt: new Date() };
        await userRepository.save(adminUser);
        await userRepository.save(salesUser);

        // Crear Categoría
        category = { id: 'cat-1', name: 'Categoría a Borrar', description: '...' };
        await categoryRepository.save(category);
    });

    it('should allow an admin to delete a category', async () => {
        const input = { actingUserId: 'admin-1', categoryId: 'cat-1' };
        await deleteCategoryUseCase.execute(input);

        // Verificamos que ya no exista en el repositorio
        const deletedCategory = await categoryRepository.findById('cat-1');
        expect(deletedCategory).toBeNull();
    });

    it('should NOT allow a salesperson to delete a category', async () => {
        const input = { actingUserId: 'sales-1', categoryId: 'cat-1' };
        
        await expect(deleteCategoryUseCase.execute(input)).rejects.toThrow('Authorization failed: Only administrators can delete categories.');
    });

    it('should throw an error if the category does not exist', async () => {
        const input = { actingUserId: 'admin-1', categoryId: 'non-existent-cat' };
        
        await expect(deleteCategoryUseCase.execute(input)).rejects.toThrow('Category not found.');
    });
});