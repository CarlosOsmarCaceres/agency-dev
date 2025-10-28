import { describe, it, expect, beforeEach } from 'vitest';
import { ListServicesUseCase } from './list-services.use-case.js';
import { InMemoryServiceRepository } from '../../repositories/__mocks__/in-memory-service.repository.js';
describe('List Services Use Case', () => {
    let serviceRepository;
    let listServicesUseCase;
    beforeEach(async () => {
        serviceRepository = new InMemoryServiceRepository();
        listServicesUseCase = new ListServicesUseCase(serviceRepository);
        // Creamos servicios de prueba en diferentes categorías
        await serviceRepository.save({ id: 'service-1', name: 'Web Corporativa Básica', categoryId: 'cat-1', price: 500, description: '...' });
        await serviceRepository.save({ id: 'service-2', name: 'Web Corporativa Avanzada', categoryId: 'cat-1', price: 1000, description: '...' });
        await serviceRepository.save({ id: 'service-3', name: 'Tienda Online Básica', categoryId: 'cat-2', price: 1500, description: '...' });
    });
    it('should return a list of all services if no filter is provided', async () => {
        const services = await listServicesUseCase.execute({}); // Sin filtro
        expect(services.length).toBe(3);
    });
    it('should return a filtered list of services when a categoryId is provided', async () => {
        const input = { categoryId: 'cat-1' };
        const services = await listServicesUseCase.execute(input);
        expect(services.length).toBe(2);
        expect(services[0].name).toBe('Web Corporativa Básica');
        expect(services[1].name).toBe('Web Corporativa Avanzada');
    });
    it('should return an empty list if no services exist', async () => {
        const emptyRepo = new InMemoryServiceRepository();
        const useCase = new ListServicesUseCase(emptyRepo);
        const services = await useCase.execute({});
        expect(services).toBeInstanceOf(Array);
        expect(services.length).toBe(0);
    });
});
//# sourceMappingURL=list-services.use-case.spec.js.map