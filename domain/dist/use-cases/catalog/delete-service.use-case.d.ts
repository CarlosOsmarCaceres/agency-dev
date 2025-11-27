import { IServiceRepository } from '../../repositories/service.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
export interface DeleteServiceInput {
    actingUserId: string;
    serviceId: string;
}
export declare class DeleteServiceUseCase {
    private userRepository;
    private serviceRepository;
    constructor(userRepository: IUserRepository, serviceRepository: IServiceRepository);
    execute(input: DeleteServiceInput): Promise<void>;
}
//# sourceMappingURL=delete-service.use-case.d.ts.map