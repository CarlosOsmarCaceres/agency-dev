import { Project } from '../../entities/business/project.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
export interface AssignUserToProjectInput {
    actingUserId: string;
    projectId: string;
    userIdToAssign: string;
}
export declare class AssignUserToProjectUseCase {
    private userRepository;
    private projectRepository;
    constructor(userRepository: IUserRepository, projectRepository: IProjectRepository);
    execute(input: AssignUserToProjectInput): Promise<Project>;
}
//# sourceMappingURL=assign-user-to-project.use-case.d.ts.map