import { Project } from "../entities/business/project.js";
export interface IProjectRepository {
    save(project: Project): Promise<Project>;
}