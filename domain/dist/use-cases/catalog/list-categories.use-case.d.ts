import { Category } from '../../entities/catalog/category.js';
import { ICategoryRepository } from '../../repositories/category.repository.js';
export declare class ListCategoriesUseCase {
    private categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    execute(): Promise<Category[]>;
}
//# sourceMappingURL=list-categories.use-case.d.ts.map