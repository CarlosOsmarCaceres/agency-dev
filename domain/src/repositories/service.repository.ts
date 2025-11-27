import { Service } from "../entities/catalog/service.js";

export interface ServiceFilters {
    categoryId?: string;
}

export interface IServiceRepository {
    findAll(filters?: ServiceFilters): Promise<Service[]>;
    findById(id: string): Promise<Service | null>; //
    update(service: Service): Promise<Service>;
    save(service: Service): Promise<Service>;
    delete(id: string): Promise<void>;
}