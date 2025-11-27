import { UserRoles } from '../../entities/users/user.js';
export class UpdateCategoryUseCase {
    userRepository;
    categoryRepository;
    constructor(userRepository, categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }
    async execute(input) {
        const { actingUserId, categoryId, data } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('User not found.');
        // --- AUTORIZACIÓN ---
        // Admin y Vendedor pueden editar categorías
        const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed.');
        }
        // --- VALIDACIÓN ---
        const category = await this.categoryRepository.findById(categoryId);
        if (!category)
            throw new Error('Category not found.');
        // --- ACCIÓN ---
        // Actualizamos solo los campos que vienen en 'data'
        Object.assign(category, data);
        return this.categoryRepository.update(category);
    }
}
//# sourceMappingURL=update-category.use-case.js.map