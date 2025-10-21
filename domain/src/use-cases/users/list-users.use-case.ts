import { IUserRepository } from '../../repositories/user-repository.js';
import { User, UserRoles } from '../../entities/users/user.js';

// DTO de entrada
export interface ListUsersInput {
    actingUserId: string;
}

// DTO de salida
type UserProfile = Omit<User, 'passwordHash'>;

export class ListUsersUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(input: ListUsersInput): Promise<UserProfile[]> {
        const actingUser = await this.userRepository.findById(input.actingUserId);

        if (!actingUser) {
            throw new Error('Acting user not found.');
        }

        // --- LÓGICA DE AUTORIZACIÓN ---
        if (actingUser.role !== UserRoles.ADMIN) {
            throw new Error('Authorization failed: Only administrators can list users.');
        }

        const users = await this.userRepository.findAll();

        // Mapeamos para quitar el passwordHash de la respuesta
        const userProfiles = users.map(user => {
            const { passwordHash, ...profile } = user;
            return profile;
        });

        return userProfiles;
    }
}