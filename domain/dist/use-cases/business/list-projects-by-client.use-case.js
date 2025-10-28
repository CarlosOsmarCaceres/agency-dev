import { UserRoles } from '../../entities/users/user.js';
export class ListProjectsByClientUseCase {
    userRepository;
    clientRepository;
    projectRepository;
    constructor(userRepository, clientRepository, projectRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.projectRepository = projectRepository;
    }
    async execute(input) {
        const { actingUserId, clientId } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('User not found.');
        // 1. Definimos los roles con privilegios
        /* const privilegedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON]; */
        const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON];
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
//# sourceMappingURL=list-projects-by-client.use-case.js.map