import { UserRoles } from '../../entities/users/user.js';
export class DeleteUserUseCase {
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
            throw new Error('Authorization failed: Only administrators can delete users.');
        }
        // --- REGLA DE NEGOCIO DE SEGURIDAD ---
        if (actingUserId === targetUserId) {
            throw new Error('Action forbidden: Administrators cannot delete themselves.');
        }
        const targetUser = await this.userRepository.findById(targetUserId);
        if (!targetUser) {
            throw new Error('Target user not found.');
        }
        // --- ACCIÓN ---
        await this.userRepository.delete(targetUserId);
    }
}
//# sourceMappingURL=delete-user.use-case.js.map