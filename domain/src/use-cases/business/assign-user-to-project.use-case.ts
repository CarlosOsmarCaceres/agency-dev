import { UserRole, UserRoles } from '../../entities/users/user.js';
import { Project } from '../../entities/business/project.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';

export interface AssignUserToProjectInput {
    actingUserId: string;
    projectId: string;
    userIdToAssign: string;
}

export class AssignUserToProjectUseCase {
    constructor(
        private userRepository: IUserRepository,
        private projectRepository: IProjectRepository
    ) {}

    async execute(input: AssignUserToProjectInput): Promise<Project> {
        const { actingUserId, projectId, userIdToAssign } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('Acting user not found.');

        // --- LÓGICA DE AUTORIZACIÓN ---
        const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed.');
        }

        const project = await this.projectRepository.findById(projectId);
        if (!project) throw new Error('Project not found.');

        const userToAssign = await this.userRepository.findById(userIdToAssign);
        if (!userToAssign) throw new Error('User to assign not found.');

        // --- REGLA DE NEGOCIO ---
        if (userToAssign.role === UserRoles.CLIENT) {
            throw new Error('Cannot assign a user with Client role to a project.');
        }

        // --- ACCIÓN ---
        project.assignedToId = userIdToAssign;

        const updatedProject = await this.projectRepository.update(project);
        return updatedProject;
    }
}