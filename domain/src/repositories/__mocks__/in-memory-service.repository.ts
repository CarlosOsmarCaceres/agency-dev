import { Service } from "../../entities/catalog/service.js";
import { IServiceRepository } from "../service.repository.js";

export class InMemoryServiceRepository implements IServiceRepository {
    public services: Service[] = [];
    
    async save(service: Service): Promise<Service> {
        this.services.push(service);
        return service;
    }
}