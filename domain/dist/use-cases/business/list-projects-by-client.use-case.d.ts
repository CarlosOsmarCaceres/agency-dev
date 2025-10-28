import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { Project } from '../../entities/business/project.js';
export interface ListProjectsByClientInput {
    actingUserId: string;
    clientId: string;
}
export declare class ListProjectsByClientUseCase {
    private userRepository;
    private clientRepository;
    private projectRepository;
    constructor(userRepository: IUserRepository, clientRepository: IClientRepository, projectRepository: IProjectRepository);
    execute(input: ListProjectsByClientInput): Promise<Project[]>;
}
//# sourceMappingURL=list-projects-by-client.use-case.d.ts.map