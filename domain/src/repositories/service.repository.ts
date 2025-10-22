import { Service } from "../entities/catalog/service.js";

export interface IServiceRepository {
    findById(id: string): Promise<Service | null>; //
    update(service: Service): Promise<Service>;
    save(service: Service): Promise<Service>;
}