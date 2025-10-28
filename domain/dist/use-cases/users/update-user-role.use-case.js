import { UserRoles } from '../../entities/users/user.js';
export class UpdateUserRoleUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        const { actingUserId, targetUserId, newRole } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) {
            throw new Error('Acting user not found.');
        }
        // --- LÓGICA DE AUTORIZACIÓN ---
        if (actingUser.role !== UserRoles.ADMIN) {
            throw new Error('Authorization failed: Only administrators can change user roles.');
        }
        // --- REGLA DE NEGOCIO DE SEGURIDAD ---
        if (actingUserId === targetUserId) {
            throw new Error('Action forbidden: Administrators cannot change their own role.');
        }
        const targetUser = await this.userRepository.findById(targetUserId);
        if (!targetUser) {
            throw new Error('Target user not found.');
        }
        // --- ACCIÓN ---
        targetUser.role = newRole;
        const updatedUser = await this.userRepository.update(targetUser);
        return updatedUser;
    }
}
//# sourceMappingURL=update-user-role.use-case.js.map