export class InMemoryProjectRepository {
    projects = [];
    async update(project) {
        const index = this.projects.findIndex(p => p.id === project.id);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...project };
        }
        return this.projects[index]; // Usamos '!' porque asumimos que existe
    }
    async findAll() {
        return this.projects;
    }
    async findById(id) {
        return this.projects.find(p => p.id === id) || null;
    }
    async findByClientId(clientId) {
        return this.projects.filter(project => project.clientId === clientId);
    }
    async save(project) {
        this.projects.push(project);
        return project;
    }
}
//# sourceMappingURL=in-memory-project.repository.js.map