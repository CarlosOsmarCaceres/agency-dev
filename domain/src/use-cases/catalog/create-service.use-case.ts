import { v4 as uuidv4 } from 'uuid';
import { Service } from '../../entities/catalog/service.js';
import { UserRoles } from '../../entities/users/user.js';
import { ICategoryRepository } from '../../repositories/category.repository.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';

// DTO de entrada
export interface CreateServiceInput {
    actingUserId: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
}

export class CreateServiceUseCase {
    constructor(
        private userRepository: IUserRepository,
        private categoryRepository: ICategoryRepository,
        private serviceRepository: IServiceRepository
    ) {}

    async execute(input: CreateServiceInput): Promise<Service> {
        const { actingUserId, name, description, price, categoryId } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('User not found.');

        // --- LÓGICA DE AUTORIZACIÓN (ESTRICTA) ---
        if (actingUser.role !== UserRoles.ADMIN) {
            throw new Error('Authorization failed: Only administrators can create services.');
        }

        // --- LÓGICA DE VALIDACIÓN ---
        const category = await this.categoryRepository.findById(categoryId);
        if (!category) {
            throw new Error('Category not found.');
        }

        const newService: Service = {
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