import { describe, it, expect, beforeEach } from 'vitest';
import { ListCategoriesUseCase } from './list-categories.use-case.js';
import { Category } from '../../entities/catalog/category.js';
import { InMemoryCategoryRepository } from '../../repositories/__mocks__/in-memory-category.repository.js';

describe('List Categories Use Case', () => {
    let categoryRepository: InMemoryCategoryRepository;
    let listCategoriesUseCase: ListCategoriesUseCase;

    beforeEach(async () => {
        categoryRepository = new InMemoryCategoryRepository();
        listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
    });

    it('should return a list of all categories', async () => {
        // Creamos algunas categorías de prueba
        const category1: Category = { id: 'cat-1', name: 'Web Corporativa', description: '...' };
        const category2: Category = { id: 'cat-2', name: 'Tienda Online', description: '...' };
        await categoryRepository.save(category1);
        await categoryRepository.save(category2);

        const categories = await listCategoriesUseCase.execute();

        expect(categories.length).toBe(2);
        /* expect(categories[0]!.name).toBe('Web Corporativa'); */
        expect(categories[0]).toEqual(expect.objectContaining({
        name: 'Web Corporativa'
        }));
    });

    it('should return an empty list if no categories exist', async () => {
        const categories = await listCategoriesUseCase.execute();

        expect(categories).toBeInstanceOf(Array);
        expect(categories.length).toBe(0);
    });
});