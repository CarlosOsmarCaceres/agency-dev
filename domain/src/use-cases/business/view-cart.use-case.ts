import { IUserRepository } from '../../repositories/user-repository.js';
import { IClientRepository } from '../../repositories/client.repository.js';
import { ICartRepository } from '../../repositories/cart.repository.js';
import { IServiceRepository } from '../../repositories/service.repository.js';
import { IMaintenancePlanRepository } from '../../repositories/maintenance-plan.repository.js';
import { Cart } from '../../entities/business/cart.js';
import { Service } from '../../entities/catalog/service.js';
import { MaintenancePlan } from '../../entities/catalog/maintenance-plan.js';

// DTO de entrada
export interface ViewCartInput {
    actingUserId: string;
}

// DTO de salida: un objeto de carrito "enriquecido"
export interface DetailedCart extends Omit<Cart, 'serviceId' | 'maintenancePlanId' | 'clientId'> {
    service: Service | null;
    maintenancePlan: MaintenancePlan | null;
}

export class ViewCartUseCase {
    constructor(
        private userRepository: IUserRepository,
        private clientRepository: IClientRepository,
        private cartRepository: ICartRepository,
        private serviceRepository: IServiceRepository,
        private maintenancePlanRepository: IMaintenancePlanRepository
    ) {}

    async execute(input: ViewCartInput): Promise<DetailedCart | null> {
        const user = await this.userRepository.findById(input.actingUserId);
        if (!user) throw new Error('User not found.');

        const client = await this.clientRepository.findByUserId(user.id);
        if (!client) throw new Error('Client profile not found.');

        const cart = await this.cartRepository.findActiveByClientId(client.id);
        if (!cart) {
            return null; // El usuario no tiene un carrito activo
        }

        let service: Service | null = null;
        if (cart.serviceId) {
            service = await this.serviceRepository.findById(cart.serviceId);
        }

        let maintenancePlan: MaintenancePlan | null = null;
        if (cart.maintenancePlanId) {
            maintenancePlan = await this.maintenancePlanRepository.findById(cart.maintenancePlanId);
        }

        // Construimos el objeto de respuesta detallado
        const detailedCart: DetailedCart = {
            id: cart.id,
            status: cart.status,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
            service,
            maintenancePlan,
        };

        return detailedCart;
    }
}