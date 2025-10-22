import { Service } from "../../entities/catalog/service.js";
import { IServiceRepository, ServiceFilters } from "../service.repository.js";

export class InMemoryServiceRepository implements IServiceRepository {
    public services: Service[] = [];

    async findAll(filters?: ServiceFilters): Promise<Service[]> {
        if (!filters || !filters.categoryId) {
            return this.services;
        }
        return this.services.filter(s => s.categoryId === filters.categoryId);
    }

   async findById(id: string): Promise<Service | null> {
        return this.services.find(s => s.id === id) || null;
    }

    async update(service: Service): Promise<Service> {
        const index = this.services.findIndex(s => s.id === service.id);
        if (index !== -1) {
            // Actualizamos el servicio en la lista
            this.services[index] = { ...this.services[index], ...service };
        }
        // 👇 CORRECCIÓN: Devolvemos el servicio que nos pasaron, que ya está actualizado 👇
        return service;
    }
    
    async save(service: Service): Promise<Service> {
        this.services.push(service);
        return service;
    }
}