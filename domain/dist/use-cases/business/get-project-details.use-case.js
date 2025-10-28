import { UserRoles } from '../../entities/users/user.js';
export class GetProjectDetailsUseCase {
    userRepository;
    clientRepository;
    projectRepository;
    serviceRepository;
    constructor(userRepository, clientRepository, projectRepository, serviceRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.projectRepository = projectRepository;
        this.serviceRepository = serviceRepository;
    }
    async execute(input) {
        const { actingUserId, projectId } = input;
        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser)
            throw new Error('User not found.');
        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            return null; // Si el proyecto no existe, devolvemos null
        }
        // --- LÓGICA DE AUTORIZACIÓN ---
        /* const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON]; */
        const allowedRoles = [UserRoles.ADMIN, UserRoles.SALESPERSON];
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
//# sourceMappingURL=get-project-details.use-case.js.map