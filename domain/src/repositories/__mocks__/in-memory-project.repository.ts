import { Project } from "../../entities/business/project.js";
import { IProjectRepository } from "../project.repository.js";
export class InMemoryProjectRepository implements IProjectRepository {
    public projects: Project[] = [];

    async update(project: Project): Promise<Project> {
        const index = this.projects.findIndex(p => p.id === project.id);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...project };
        }
        return this.projects[index]!; // Usamos '!' porque asumimos que existe
    }

    async findById(id: string): Promise<Project | null> {
        return this.projects.find(p => p.id === id) || null;
    }

    async findByClientId(clientId: string): Promise<Project[]> {
        return this.projects.filter(project => project.clientId === clientId);
    }
    async save(project: Project): Promise<Project> {
        this.projects.push(project);
        return project;
    }
}