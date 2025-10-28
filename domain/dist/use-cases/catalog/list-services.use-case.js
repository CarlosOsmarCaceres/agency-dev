export class ListServicesUseCase {
    serviceRepository;
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async execute(input) {
        const services = await this.serviceRepository.findAll(input);
        return services;
    }
}
//# sourceMappingURL=list-services.use-case.js.map