import { Project } from "../entities/business/project.js";

export interface IProjectRepository {
    findById(id: string): Promise<Project | null>;
    findByClientId(clientId: string): Promise<Project[]>;
    save(project: Project): Promise<Project>;
}