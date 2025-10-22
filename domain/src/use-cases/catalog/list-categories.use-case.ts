import { Category } from '../../entities/catalog/category.js';
import { ICategoryRepository } from '../../repositories/category.repository.js';

export class ListCategoriesUseCase {
    constructor(private categoryRepository: ICategoryRepository) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoryRepository.findAll();
        return categories;
    }
}