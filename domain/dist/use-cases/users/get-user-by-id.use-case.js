import { UserRoles } from '../../entities/users/user.js';
export class GetUserByIdUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        const { actingUserId, targetUserId } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) {
            throw new Error('Acting user not found.');
        }
        // --- LÓGICA DE AUTORIZACIÓN ---
        if (actingUser.role !== UserRoles.ADMIN) {
            throw new Error('Authorization failed: Only administrators can perform this action.');
        }
        const targetUser = await this.userRepository.findById(targetUserId);
        if (!targetUser) {
            throw new Error('Target user not found.');
        }
        // Excluimos el passwordHash de la respuesta
        const { passwordHash, ...profile } = targetUser;
        return profile;
    }
}
//# sourceMappingURL=get-user-by-id.use-case.js.map