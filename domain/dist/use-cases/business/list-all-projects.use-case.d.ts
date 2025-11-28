import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { Project } from '../../entities/business/project.js';
export interface ListAllProjectsInput {
    actingUserId: string;
}
export declare class ListAllProjectsUseCase {
    private userRepository;
    private projectRepository;
    constructor(userRepository: IUserRepository, projectRepository: IProjectRepository);
    execute(input: ListAllProjectsInput): Promise<Project[]>;
}
//# sourceMappingURL=list-all-projects.use-case.d.ts.map