import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { ICartRepository } from '../../repositories/cart.repository.js';
import { Cart } from '../../entities/business/cart.js';
export interface RemoveFromCartInput {
    actingUserId: string;
    itemToRemove: 'service' | 'maintenancePlan';
}
export declare class RemoveFromCartUseCase {
    private userRepository;
    private clientRepository;
    private cartRepository;
    constructor(userRepository: IUserRepository, clientRepository: IClientRepository, cartRepository: ICartRepository);
    execute(input: RemoveFromCartInput): Promise<Cart | null>;
}
//# sourceMappingURL=remove-from-cart.use-case.d.ts.map