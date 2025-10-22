import { Service } from "../entities/catalog/service.js";

export interface IServiceRepository {
    save(service: Service): Promise<Service>;
    // En el futuro podríamos añadir: findByName, findById, etc.
}