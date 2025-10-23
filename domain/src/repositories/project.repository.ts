import { Project } from "../entities/business/project.js";
export interface IProjectRepository {
    findByClientId(clientId: string): Promise<Project[]>;
    save(project: Project): Promise<Project>;
}