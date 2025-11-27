import { Category } from '../../entities/catalog/category.js';
import { ICategoryRepository } from '../../repositories/category.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
export interface UpdateCategoryInput {
    actingUserId: string;
    categoryId: string;
    data: {
        name?: string;
        description?: string;
    };
}
export declare class UpdateCategoryUseCase {
    private userRepository;
    private categoryRepository;
    constructor(userRepository: IUserRepository, categoryRepository: ICategoryRepository);
    execute(input: UpdateCategoryInput): Promise<Category>;
}
//# sourceMappingURL=update-category.use-case.d.ts.map