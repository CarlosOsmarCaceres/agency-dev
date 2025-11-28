import { UserRoles } from '../../entities/users/user.js';
export class ListAllProjectsUseCase {
    userRepository;
    projectRepository;
    constructor(userRepository, projectRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }
    async execute(input) {
        const { actingUserId } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('User not found.');
        // --- AUTORIZACIÓN: Solo Admin o Vendedor ---
        const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed: Access restricted to Admin or Sales.');
        }
        return this.projectRepository.findAll();
    }
}
//# sourceMappingURL=list-all-projects.use-case.js.map