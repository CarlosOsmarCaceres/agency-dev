import { Category } from '../../entities/catalog/category.js';
import { ICategoryRepository } from '../../repositories/category.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
export interface CreateCategoryInput {
    actingUserId: string;
    name: string;
    description: string;
}
export declare class CreateCategoryUseCase {
    private userRepository;
    private categoryRepository;
    constructor(userRepository: IUserRepository, categoryRepository: ICategoryRepository);
    execute(input: CreateCategoryInput): Promise<Category>;
}
//# sourceMappingURL=create-category.use-case.d.ts.map