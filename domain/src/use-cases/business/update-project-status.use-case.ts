import { UserRole, UserRoles } from '../../entities/users/user.js';
import { Project, ProjectStatus, ProjectStatuses } from '../../entities/business/project.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';

export interface UpdateProjectStatusInput {
    actingUserId: string;
    projectId: string;
    newStatus: ProjectStatus;
}

export class UpdateProjectStatusUseCase {
    constructor(
        private userRepository: IUserRepository,
        private projectRepository: IProjectRepository
    ) {}

    async execute(input: UpdateProjectStatusInput): Promise<Project> {
        const { actingUserId, projectId, newStatus } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('Acting user not found.');

        // --- Authorization Logic ---
        const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed.');
        }

        const project = await this.projectRepository.findById(projectId);
        if (!project) throw new Error('Project not found.');

        // --- Validation Logic ---
        // Check if newStatus is a valid value from our defined statuses
        const validStatuses = Object.values(ProjectStatuses);
        if (!validStatuses.includes(newStatus)) {
            throw new Error('Invalid project status.');
        }

        // --- Action ---
        project.status = newStatus;

        const updatedProject = await this.projectRepository.update(project);
        return updatedProject;
    }
}