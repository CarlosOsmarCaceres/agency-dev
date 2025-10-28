import { IProjectRepository } from '../../repositories/project.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
import { Project } from '../../entities/business/project.js';
import { Service } from '../../entities/catalog/service.js';
export interface GetProjectDetailsInput {
    actingUserId: string;
    projectId: string;
}
export interface GetProjectDetailsOutput {
    project: Project;
    service: Service | null;
}
export declare class GetProjectDetailsUseCase {
    private userRepository;
    private clientRepository;
    private projectRepository;
    private serviceRepository;
    constructor(userRepository: IUserRepository, clientRepository: IClientRepository, projectRepository: IProjectRepository, serviceRepository: IServiceRepository);
    execute(input: GetProjectDetailsInput): Promise<GetProjectDetailsOutput | null>;
}
//# sourceMappingURL=get-project-details.use-case.d.ts.map