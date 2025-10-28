import { Project, ProjectStatus } from '../../entities/business/project.js';
import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
export interface UpdateProjectStatusInput {
    actingUserId: string;
    projectId: string;
    newStatus: ProjectStatus;
}
export declare class UpdateProjectStatusUseCase {
    private userRepository;
    private projectRepository;
    constructor(userRepository: IUserRepository, projectRepository: IProjectRepository);
    execute(input: UpdateProjectStatusInput): Promise<Project>;
}
//# sourceMappingURL=update-project-status.use-case.d.ts.map