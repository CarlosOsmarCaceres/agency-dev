import { UserRoles } from '../../entities/users/user.js';
export class UpdateUserProfileUseCase {
    userRepository;
    clientRepository;
    constructor(userRepository, clientRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
    }
    async execute(input) {
        const { actingUserId, targetUserId, data } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) {
            throw new Error('Acting user not found.');
        }
        const targetUser = await this.userRepository.findById(targetUserId);
        if (!targetUser) {
            throw new Error('Target user not found.');
        }
        // --- LÓGICA DE AUTORIZACIÓN ---
        const isAdmin = actingUser.role === UserRoles.ADMIN;
        const isOwner = actingUser.id === targetUser.id;
        if (!isAdmin && !isOwner) {
            throw new Error('Authorization failed.');
        }
        // --- LÓGICA DE ACTUALIZACIÓN ---
        let userWasUpdated = false;
        if (data.name && data.name !== targetUser.name) {
            targetUser.name = data.name;
            userWasUpdated = true;
        }
        // Si se provee un teléfono, actualizamos la entidad Client
        if (data.contactPhone) {
            const clientProfile = await this.clientRepository.findByUserId(targetUserId);
            if (clientProfile) {
                clientProfile.contactPhone = data.contactPhone;
                await this.clientRepository.update(clientProfile);
            }
        }
        // Guardamos la entidad User solo si cambió
        if (userWasUpdated) {
            await this.userRepository.update(targetUser);
        }
        return targetUser;
    }
}
//# sourceMappingURL=update-user-profile.use-case.js.map