import { v4 as uuidv4 } from 'uuid';
import { UserRoles } from '../../entities/users/user.js';
export class CreateServiceUseCase {
    userRepository;
    categoryRepository;
    serviceRepository;
    constructor(userRepository, categoryRepository, serviceRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.serviceRepository = serviceRepository;
    }
    async execute(input) {
        const { actingUserId, name, description, price, categoryId } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('User not found.');
        // --- LÓGICA DE AUTORIZACIÓN (ESTRICTA) ---
        if (actingUser.role !== UserRoles.ADMIN) {
            throw new Error('Authorization failed: Only administrators can create services.');
        }
        // --- LÓGICA DE VALIDACIÓN ---
        const category = await this.categoryRepository.findById(categoryId);
        if (!category) {
            throw new Error('Category not found.');
        }
        const newService = {
            id: uuidv4(),
            name,
            description,
            price,
            categoryId,
        };
        await this.serviceRepository.save(newService);
        return newService;
    }
}
//# sourceMappingURL=create-service.use-case.js.map