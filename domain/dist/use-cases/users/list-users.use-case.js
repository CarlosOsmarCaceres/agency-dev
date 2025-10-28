import { UserRoles } from '../../entities/users/user.js';
export class ListUsersUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
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
//# sourceMappingURL=list-users.use-case.js.map