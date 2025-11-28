import { Project } from "../../entities/business/project.js";
import { IProjectRepository } from "../project.repository.js";
export declare class InMemoryProjectRepository implements IProjectRepository {
    projects: Project[];
    update(project: Project): Promise<Project>;
    findAll(): Promise<Project[]>;
    findById(id: string): Promise<Project | null>;
    findByClientId(clientId: string): Promise<Project[]>;
    save(project: Project): Promise<Project>;
}
//# sourceMappingURL=in-memory-project.repository.d.ts.map