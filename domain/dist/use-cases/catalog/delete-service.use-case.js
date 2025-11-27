import { UserRoles } from '../../entities/users/user.js';
export class DeleteServiceUseCase {
    userRepository;
    serviceRepository;
    constructor(userRepository, serviceRepository) {
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
    }
    async execute(input) {
        const { actingUserId, serviceId } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('User not found.');
        // --- LÓGICA DE AUTORIZACIÓN ---
        // Solo Admin puede borrar (es una acción destructiva)
        if (actingUser.role !== UserRoles.ADMIN) {
            throw new Error('Authorization failed: Only administrators can delete services.');
        }
        const service = await this.serviceRepository.findById(serviceId);
        if (!service)
            throw new Error('Service not found.');
        await this.serviceRepository.delete(serviceId);
    }
}
//# sourceMappingURL=delete-service.use-case.js.map