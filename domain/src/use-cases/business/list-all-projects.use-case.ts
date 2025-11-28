import { UserRoles, UserRole } from '../../entities/users/user.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { Project } from '../../entities/business/project.js';

export interface ListAllProjectsInput {
    actingUserId: string;
}

export class ListAllProjectsUseCase {
    constructor(
        private userRepository: IUserRepository,
        private projectRepository: IProjectRepository
    ) {}

    async execute(input: ListAllProjectsInput): Promise<Project[]> {
        const { actingUserId } = input;

        const actingUser = await this.userRepository.findById(actingUserId);
        if (!actingUser) throw new Error('User not found.');

        // --- AUTORIZACIÓN: Solo Admin o Vendedor ---
        const allowedRoles: UserRole[] = [UserRoles.ADMIN, UserRoles.SALESPERSON];
        if (!allowedRoles.includes(actingUser.role)) {
            throw new Error('Authorization failed: Access restricted to Admin or Sales.');
        }

        return this.projectRepository.findAll();
    }
}