import { UserRole, UserRoles } from '../../entities/users/user.js';
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

export class UpdateServiceUseCase {
    constructor(
        private userRepository: IUserRepository,
        private serviceRepository: IServiceRepository
    ) {}

    async execute(input: UpdateServiceInput): Promise<Service> {
        const { actingUserId, serviceId, data } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('User not found.');

        // --- LÓGICA DE AUTORIZACIÓN ---
        const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed.');
        }

        const service = await this.serviceRepository.findById(serviceId);
        if (!service) throw new Error('Service not found.');

        // --- LÓGICA DE ACTUALIZACIÓN ---
        // Object.assign actualiza las propiedades del servicio con los nuevos datos
        Object.assign(service, data);

        const updatedService = await this.serviceRepository.update(service);
        return updatedService;
    }
}