import { UserRoles, UserRole } from '../../entities/users/user.js';
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

export class UpdateCategoryUseCase {
    constructor(
        private userRepository: IUserRepository,
        private categoryRepository: ICategoryRepository
    ) {}

    async execute(input: UpdateCategoryInput): Promise<Category> {
        const { actingUserId, categoryId, data } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('User not found.');

        // --- AUTORIZACIÓN ---
        // Admin y Vendedor pueden editar categorías
        const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed.');
        }

        // --- VALIDACIÓN ---
        const category = await this.categoryRepository.findById(categoryId);
        if (!category) throw new Error('Category not found.');

        // --- ACCIÓN ---
        // Actualizamos solo los campos que vienen en 'data'
        Object.assign(category, data);

        return this.categoryRepository.update(category);
    }
}