import { Service } from '../../entities/catalog/service.js';
import { IServiceRepository, ServiceFilters } from '../../repositories/service.repository.js';

// DTO de entrada (coincide con los filtros del repositorio)
export type ListServicesInput = ServiceFilters;

export class ListServicesUseCase {
    constructor(private serviceRepository: IServiceRepository) {}

    async execute(input: ListServicesInput): Promise<Service[]> {
        const services = await this.serviceRepository.findAll(input);
        return services;
    }
}