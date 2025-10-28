import { Service } from '../../entities/catalog/service.js';
import { IServiceRepository, ServiceFilters } from '../../repositories/service.repository.js';
export type ListServicesInput = ServiceFilters;
export declare class ListServicesUseCase {
    private serviceRepository;
    constructor(serviceRepository: IServiceRepository);
    execute(input: ListServicesInput): Promise<Service[]>;
}
//# sourceMappingURL=list-services.use-case.d.ts.map