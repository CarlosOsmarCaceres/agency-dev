import { UserRoles } from '../../entities/users/user.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';

export interface DeleteServiceInput {
    actingUserId: string;
    serviceId: string;
}

export class DeleteServiceUseCase {
    constructor(
        private userRepository: IUserRepository,
        private serviceRepository: IServiceRepository
    ) {}

    async execute(input: DeleteServiceInput): Promise<void> {
        const { actingUserId, serviceId } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('User not found.');

        // --- LÓGICA DE AUTORIZACIÓN ---
        // Solo Admin puede borrar (es una acción destructiva)
        if (actingUser.role !== UserRoles.ADMIN) {
            throw new Error('Authorization failed: Only administrators can delete services.');
        }

        const service = await this.serviceRepository.findById(serviceId);
        if (!service) throw new Error('Service not found.');

        await this.serviceRepository.delete(serviceId);
    }
}