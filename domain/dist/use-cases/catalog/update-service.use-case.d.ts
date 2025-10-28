import { Service } from '../../entities/catalog/service.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
export interface UpdateServiceInput {
    actingUserId: string;
    serviceId: string;
    data: {
        name?: string;
        description?: string;
        price?: number;
    };
}
export declare class UpdateServiceUseCase {
    private userRepository;
    private serviceRepository;
    constructor(userRepository: IUserRepository, serviceRepository: IServiceRepository);
    execute(input: UpdateServiceInput): Promise<Service>;
}
//# sourceMappingURL=update-service.use-case.d.ts.map