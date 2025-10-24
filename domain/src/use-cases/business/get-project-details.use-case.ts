import { UserRoles, UserRole } from '../../entities/users/user.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
import { Project } from '../../entities/business/project.js';
import { Service } from '../../entities/catalog/service.js';

// DTOs
export interface GetProjectDetailsInput {
    actingUserId: string;
    projectId: string;
}

export interface GetProjectDetailsOutput {
    project: Project;
    service: Service | null;
    // Podríamos añadir client, maintenancePlan, etc.
}

export class GetProjectDetailsUseCase {
    constructor(
        private userRepository: IUserRepository,
        private clientRepository: IClientRepository,
        private projectRepository: IProjectRepository,
        private serviceRepository: IServiceRepository
    ) {}

    async execute(input: GetProjectDetailsInput): Promise<GetProjectDetailsOutput | null> {
        const { actingUserId, projectId } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('User not found.');

        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            return null; // Si el proyecto no existe, devolvemos null
        }

        // --- LÓGICA DE AUTORIZACIÓN ---
        /* const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON]; */

        const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];

        const isPrivilegedUser = allowedRoles.includes(actingUser.role);
        
        let isOwner = false;
        if (!isPrivilegedUser) {
            const clientProfile = await this.clientRepository.findByUserId(actingUser.id);
            isOwner = clientProfile?.id === project.clientId;
        }

        if (!isPrivilegedUser && !isOwner) {
            throw new Error('Authorization failed.');
        }

        // --- ENRIQUECIMIENTO DE DATOS ---
        const service = await this.serviceRepository.findById(project.serviceId);

        return { project, service };
    }
}