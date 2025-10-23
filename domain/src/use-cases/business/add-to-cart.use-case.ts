import { v4 as uuidv4 } from 'uuid';
import { Cart, CartStatuses } from '../../entities/business/cart.js';
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

export class AddToCartUseCase {
    constructor(
        private userRepository: IUserRepository,
        private clientRepository: IClientRepository,
        private serviceRepository: IServiceRepository,
        private maintenancePlanRepository: IMaintenancePlanRepository,
        private cartRepository: ICartRepository
    ) {}

    async execute(input: AddToCartInput): Promise<Cart> {
        const { actingUserId, serviceId, maintenancePlanId } = input;
        
        const user = await this.userRepository.findById(actingUserId);
        if (!user) throw new Error('User not found.');
        
        const client = await this.clientRepository.findByUserId(user.id);
        if (!client) throw new Error('Client profile not found.');

        const service = await this.serviceRepository.findById(serviceId);
        if (!service) throw new Error('Service not found.');

        if (maintenancePlanId) {
            const plan = await this.maintenancePlanRepository.findById(maintenancePlanId);
            if (!plan) throw new Error('Maintenance plan not found.');
        }

        let cart = await this.cartRepository.findActiveByClientId(client.id);

        if (cart) {
            // Si ya hay un carrito, lo actualizamos
            cart.serviceId = serviceId;
            cart.maintenancePlanId = maintenancePlanId || null;
            cart.updatedAt = new Date();
            await this.cartRepository.update(cart);
        } else {
            // Si no hay carrito, creamos uno nuevo
            cart = {
                id: uuidv4(),
                clientId: client.id,
                status: CartStatuses.ACTIVE,
                serviceId: serviceId,
                maintenancePlanId: maintenancePlanId || null,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await this.cartRepository.save(cart);
        }
        
        return cart;
    }
}