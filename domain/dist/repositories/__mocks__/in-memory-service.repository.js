export class InMemoryServiceRepository {
    services = [];
    async findAll(filters) {
        if (!filters || !filters.categoryId) {
            return this.services;
        }
        return this.services.filter(s => s.categoryId === filters.categoryId);
    }
    async findById(id) {
        return this.services.find(s => s.id === id) || null;
    }
    async update(service) {
        const index = this.services.findIndex(s => s.id === service.id);
        if (index !== -1) {
            // Actualizamos el servicio en la lista
            this.services[index] = { ...this.services[index], ...service };
        }
        // 👇 CORRECCIÓN: Devolvemos el servicio que nos pasaron, que ya está actualizado 👇
        return service;
    }
    async save(service) {
        this.services.push(service);
        return service;
    }
    async delete(id) {
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
            this.services.splice(index, 1);
        }
    }
}
//# sourceMappingURL=in-memory-service.repository.js.map