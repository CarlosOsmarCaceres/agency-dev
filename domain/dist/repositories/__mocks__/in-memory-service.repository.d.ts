import { Service } from "../../entities/catalog/service.js";
import { IServiceRepository, ServiceFilters } from "../service.repository.js";
export declare class InMemoryServiceRepository implements IServiceRepository {
    services: Service[];
    findAll(filters?: ServiceFilters): Promise<Service[]>;
    findById(id: string): Promise<Service | null>;
    update(service: Service): Promise<Service>;
    save(service: Service): Promise<Service>;
}
//# sourceMappingURL=in-memory-service.repository.d.ts.map