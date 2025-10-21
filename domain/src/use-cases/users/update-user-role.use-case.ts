import { IUserRepository } from '../../repositories/user-repository.js';
import { User, UserRole, UserRoles } from '../../entities/users/user.js';

// DTO de entrada
export interface UpdateUserRoleInput {
    actingUserId: string;
    targetUserId: string;
    newRole: UserRole;
}

export class UpdateUserRoleUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(input: UpdateUserRoleInput): Promise<User> {
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