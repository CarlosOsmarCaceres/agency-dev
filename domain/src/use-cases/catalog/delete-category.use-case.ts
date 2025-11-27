import { UserRoles } from '../../entities/users/user.js';
import { ICategoryRepository } from '../../repositories/category.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';

export interface DeleteCategoryInput {
    actingUserId: string;
    categoryId: string;
}

export class DeleteCategoryUseCase {
    constructor(
        private userRepository: IUserRepository,
        private categoryRepository: ICategoryRepository
    ) {}

    async execute(input: DeleteCategoryInput): Promise<void> {
        const { actingUserId, categoryId } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('User not found.');

        // AUTORIZACIÓN: Solo Admin puede borrar categorías
        if (actingUser.role !== UserRoles.ADMIN) {
            throw new Error('Authorization failed: Only administrators can delete categories.');
        }

        const category = await this.categoryRepository.findById(categoryId);
        if (!category) throw new Error('Category not found.');

        await this.categoryRepository.delete(categoryId);
    }
}