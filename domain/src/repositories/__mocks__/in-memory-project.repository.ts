import { Project } from "../../entities/business/project.js";
import { IProjectRepository } from "../project.repository.js";
export class InMemoryProjectRepository implements IProjectRepository {
    public projects: Project[] = [];
    async save(project: Project): Promise<Project> {
        this.projects.push(project);
        return project;
    }
}