import { Project } from "../entities/business/project.js";
export interface IProjectRepository {
    findAll(): Promise<Project[]>;
    update(project: Project): Promise<Project>;
    findById(id: string): Promise<Project | null>;
    findByClientId(clientId: string): Promise<Project[]>;
    save(project: Project): Promise<Project>;
}
//# sourceMappingURL=project.repository.d.ts.map