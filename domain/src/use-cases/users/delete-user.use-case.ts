import { IUserRepository } from '../../repositories/user-repository.js';
import { UserRoles } from '../../entities/users/user.js';

// DTO de entrada
export interface DeleteUserInput {
    actingUserId: string;
    targetUserId: string;
}

export class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(input: DeleteUserInput): Promise<void> {
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