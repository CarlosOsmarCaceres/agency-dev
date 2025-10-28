import { UserRoles } from '../../entities/users/user.js';
export class UpdateServiceUseCase {
    userRepository;
    serviceRepository;
    constructor(userRepository, serviceRepository) {
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
    }
    async execute(input) {
        const { actingUserId, serviceId, data } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('User not found.');
        // --- LÓGICA DE AUTORIZACIÓN ---
        const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed.');
        }
        const service = await this.serviceRepository.findById(serviceId);
        if (!service)
            throw new Error('Service not found.');
        // --- LÓGICA DE ACTUALIZACIÓN ---
        // Object.assign actualiza las propiedades del servicio con los nuevos datos
        Object.assign(service, data);
        const updatedService = await this.serviceRepository.update(service);
        return updatedService;
    }
}
//# sourceMappingURL=update-service.use-case.js.map