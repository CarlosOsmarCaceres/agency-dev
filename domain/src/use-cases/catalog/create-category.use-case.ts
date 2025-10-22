import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../entities/catalog/category.js';
import { UserRoles, UserRole } from '../../entities/users/user.js';
import { ICategoryRepository } from '../../repositories/category.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';

// DTO de entrada
export interface CreateCategoryInput {
    actingUserId: string;
    name: string;
    description: string;
}

export class CreateCategoryUseCase {
    constructor(
        private userRepository: IUserRepository,
        private categoryRepository: ICategoryRepository
    ) {}

    async execute(input: CreateCategoryInput): Promise<Category> {
        const { actingUserId, name, description } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) {
            throw new Error('User not found.');
        }

        // --- LÓGICA DE AUTORIZACIÓN ACTUALIZADA ---
        // Creamos una lista de roles permitidos
        const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];

        // Verificamos si el rol del usuario está en la lista
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed.');
        }

        // El resto de la lógica no cambia...
        const existingCategory = await this.categoryRepository.findByName(name);
        if (existingCategory) {
            throw new Error('Category with this name already exists.');
        }

        const newCategory: Category = {
            id: uuidv4(),
            name,
            description,
        };

        await this.categoryRepository.save(newCategory);

        return newCategory;
    }
}