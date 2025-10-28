import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { ICartRepository } from '../../repositories/cart.repository.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
import { IMaintenancePlanRepository } from '../../repositories/maintenance-plan.repository.js';
import { Cart } from '../../entities/business/cart.js';
import { Service } from '../../entities/catalog/service.js';
import { MaintenancePlan } from '../../entities/catalog/maintenance-plan.js';
export interface ViewCartInput {
    actingUserId: string;
}
export interface DetailedCart extends Omit<Cart, 'serviceId' | 'maintenancePlanId' | 'clientId'> {
    service: Service | null;
    maintenancePlan: MaintenancePlan | null;
}
export declare class ViewCartUseCase {
    private userRepository;
    private clientRepository;
    private cartRepository;
    private serviceRepository;
    private maintenancePlanRepository;
    constructor(userRepository: IUserRepository, clientRepository: IClientRepository, cartRepository: ICartRepository, serviceRepository: IServiceRepository, maintenancePlanRepository: IMaintenancePlanRepository);
    execute(input: ViewCartInput): Promise<DetailedCart | null>;
}
//# sourceMappingURL=view-cart.use-case.d.ts.map