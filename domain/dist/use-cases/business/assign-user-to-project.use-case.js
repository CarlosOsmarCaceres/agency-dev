import { UserRoles } from '../../entities/users/user.js';
export class AssignUserToProjectUseCase {
    userRepository;
    projectRepository;
    constructor(userRepository, projectRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }
    async execute(input) {
        const { actingUserId, projectId, userIdToAssign } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('Acting user not found.');
        // --- LÓGICA DE AUTORIZACIÓN ---
        const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed.');
        }
        const project = await this.projectRepository.findById(projectId);
        if (!project)
            throw new Error('Project not found.');
        const userToAssign = await this.userRepository.findById(userIdToAssign);
        if (!userToAssign)
            throw new Error('User to assign not found.');
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
//# sourceMappingURL=assign-user-to-project.use-case.js.map