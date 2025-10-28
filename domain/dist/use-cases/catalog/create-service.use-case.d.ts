import { Service } from '../../entities/catalog/service.js';
import { ICategoryRepository } from '../../repositories/category.repository.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
export interface CreateServiceInput {
    actingUserId: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
}
export declare class CreateServiceUseCase {
    private userRepository;
    private categoryRepository;
    private serviceRepository;
    constructor(userRepository: IUserRepository, categoryRepository: ICategoryRepository, serviceRepository: IServiceRepository);
    execute(input: CreateServiceInput): Promise<Service>;
}
//# sourceMappingURL=create-service.use-case.d.ts.map