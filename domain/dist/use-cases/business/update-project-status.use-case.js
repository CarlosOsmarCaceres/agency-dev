import { UserRoles } from '../../entities/users/user.js';
import { ProjectStatuses } from '../../entities/business/project.js';
export class UpdateProjectStatusUseCase {
    userRepository;
    projectRepository;
    constructor(userRepository, projectRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }
    async execute(input) {
        const { actingUserId, projectId, newStatus } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('Acting user not found.');
        // --- Authorization Logic ---
        const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed.');
        }
        const project = await this.projectRepository.findById(projectId);
        if (!project)
            throw new Error('Project not found.');
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
//# sourceMappingURL=update-project-status.use-case.js.map