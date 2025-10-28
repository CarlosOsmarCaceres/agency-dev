import { Cart } from '../../entities/business/cart.js';
import { ICartRepository } from '../../repositories/cart.repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { IMaintenancePlanRepository } from '../../repositories/maintenance-plan.repository.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
import { IUserRepository } from '../../repositories/user-repository.js';
export interface AddToCartInput {
    actingUserId: string;
    serviceId: string;
    maintenancePlanId?: string;
}
export declare class AddToCartUseCase {
    private userRepository;
    private clientRepository;
    private serviceRepository;
    private maintenancePlanRepository;
    private cartRepository;
    constructor(userRepository: IUserRepository, clientRepository: IClientRepository, serviceRepository: IServiceRepository, maintenancePlanRepository: IMaintenancePlanRepository, cartRepository: ICartRepository);
    execute(input: AddToCartInput): Promise<Cart>;
}
//# sourceMappingURL=add-to-cart.use-case.d.ts.map