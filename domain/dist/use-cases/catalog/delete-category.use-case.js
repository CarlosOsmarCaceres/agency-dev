import { UserRoles } from '../../entities/users/user.js';
export class DeleteCategoryUseCase {
    userRepository;
    categoryRepository;
    constructor(userRepository, categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }
    async execute(input) {
        const { actingUserId, categoryId } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('User not found.');
        // AUTORIZACIÓN: Solo Admin puede borrar categorías
        if (actingUser.role !== UserRoles.ADMIN) {
            throw new Error('Authorization failed: Only administrators can delete categories.');
        }
        const category = await this.categoryRepository.findById(categoryId);
        if (!category)
            throw new Error('Category not found.');
        await this.categoryRepository.delete(categoryId);
    }
}
//# sourceMappingURL=delete-category.use-case.js.map