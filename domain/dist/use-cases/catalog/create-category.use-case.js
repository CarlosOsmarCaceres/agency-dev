import { v4 as uuidv4 } from 'uuid';
import { UserRoles } from '../../entities/users/user.js';
export class CreateCategoryUseCase {
    userRepository;
    categoryRepository;
    constructor(userRepository, categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }
    async execute(input) {
        const { actingUserId, name, description } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) {
            throw new Error('User not found.');
        }
        // --- LÓGICA DE AUTORIZACIÓN ACTUALIZADA ---
        // Creamos una lista de roles permitidos
        const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        // Verificamos si el rol del usuario está en la lista
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed.');
        }
        // El resto de la lógica no cambia...
        const existingCategory = await this.categoryRepository.findByName(name);
        if (existingCategory) {
            throw new Error('Category with this name already exists.');
        }
        const newCategory = {
            id: uuidv4(),
            name,
            description,
        };
        await this.categoryRepository.save(newCategory);
        return newCategory;
    }
}
//# sourceMappingURL=create-category.use-case.js.map