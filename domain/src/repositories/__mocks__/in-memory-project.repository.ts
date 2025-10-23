import { Project } from "../../entities/business/project.js";
import { IProjectRepository } from "../project.repository.js";
export class InMemoryProjectRepository implements IProjectRepository {
    public projects: Project[] = [];
    
    async findByClientId(clientId: string): Promise<Project[]> {
        return this.projects.filter(project => project.clientId === clientId);
    }
    async save(project: Project): Promise<Project> {
        this.projects.push(project);
        return project;
    }
}