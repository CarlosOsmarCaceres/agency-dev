import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { User, UserRoles } from '../../entities/users/user.js';

// DTO de entrada
export interface UpdateUserProfileInput {
    actingUserId: string;   // Quién realiza la acción
    targetUserId: string;   // A quién se le modifica el perfil
    data: {
        name?: string;
        contactPhone?: string;
    };
}

export class UpdateUserProfileUseCase {
    constructor(
        private userRepository: IUserRepository,
        private clientRepository: IClientRepository
    ) {}

    async execute(input: UpdateUserProfileInput): Promise<User> {
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