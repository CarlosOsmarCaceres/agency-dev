import { UserRoles } from '../../entities/users/user.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { Project } from '../../entities/business/project.js';

export interface ListProjectsByClientInput {
    actingUserId: string;
    clientId: string;
}

export class ListProjectsByClientUseCase {
    constructor(
        private userRepository: IUserRepository,
        private clientRepository: IClientRepository,
        private projectRepository: IProjectRepository,
        
    ) {}

    async execute(input: ListProjectsByClientInput): Promise<Project[]> {
        const { actingUserId, clientId } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('User not found.');

        // --- LÓGICA DE AUTORIZACIÓN ---
        const isAdmin = actingUser.role === UserRoles.ADMIN;
        // Buscamos si el usuario que actúa es dueño del perfil de cliente que se quiere consultar
        const isOwner = actingUser.id === (await this.userRepository.findByClientId(clientId))?.id;

        if (!isAdmin && !isOwner) {
            throw new Error('Authorization failed.');
        }

        const projects = await this.projectRepository.findByClientId(clientId);
        return projects;
    }
}