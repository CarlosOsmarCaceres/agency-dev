import { UserRoles, UserRole } from '../../entities/users/user.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { Project } from '../../entities/business/project.js';
/* import { a } from 'vitest/dist/chunks/suite.d.FvehnV49.js'; */
/* import { afterAll } from 'vitest'; */

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
        
        // 1. Definimos los roles con privilegios
        /* const privilegedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON]; */
        const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        const isPrivilegedUser = allowedRoles.includes(actingUser.role);
        
        // 2. Verificamos si es el dueño (solo si no es un rol con privilegios)
        let isOwner = false;
        if (!isPrivilegedUser) {
            const clientProfile = await this.clientRepository.findByUserId(actingUser.id);
            isOwner = clientProfile?.id === clientId;
        }

        // 3. Aplicamos la regla final
        if (!isPrivilegedUser && !isOwner) {
            throw new Error('Authorization failed.');
        }

        // Si la autorización pasa, buscamos y devolvemos los proyectos
        const projects = await this.projectRepository.findByClientId(clientId);
        return projects;
    }
}