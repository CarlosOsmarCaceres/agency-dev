import { IUserRepository } from '../../repositories/user-repository.js';
import { User, UserRoles } from '../../entities/users/user.js';

// DTO de entrada
export interface GetUserByIdInput {
    actingUserId: string;
    targetUserId: string;
}

// DTO de salida
type UserProfile = Omit<User, 'passwordHash'>;

export class GetUserByIdUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(input: GetUserByIdInput): Promise<UserProfile> {
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