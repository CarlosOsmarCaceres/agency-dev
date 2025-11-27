import { ICategoryRepository } from '../../repositories/category.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
export interface DeleteCategoryInput {
    actingUserId: string;
    categoryId: string;
}
export declare class DeleteCategoryUseCase {
    private userRepository;
    private categoryRepository;
    constructor(userRepository: IUserRepository, categoryRepository: ICategoryRepository);
    execute(input: DeleteCategoryInput): Promise<void>;
}
//# sourceMappingURL=delete-category.use-case.d.ts.map