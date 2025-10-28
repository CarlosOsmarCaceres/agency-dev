import { v4 as uuidv4 } from 'uuid';
import { CartStatuses } from '../../entities/business/cart.js';
export class AddToCartUseCase {
    userRepository;
    clientRepository;
    serviceRepository;
    maintenancePlanRepository;
    cartRepository;
    constructor(userRepository, clientRepository, serviceRepository, maintenancePlanRepository, cartRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.serviceRepository = serviceRepository;
        this.maintenancePlanRepository = maintenancePlanRepository;
        this.cartRepository = cartRepository;
    }
    async execute(input) {
        const { actingUserId, serviceId, maintenancePlanId } = input;
        const user = await this.userRepository.findById(actingUserId);
        if (!user)
            throw new Error('User not found.');
        const client = await this.clientRepository.findByUserId(user.id);
        if (!client)
            throw new Error('Client profile not found.');
        const service = await this.serviceRepository.findById(serviceId);
        if (!service)
            throw new Error('Service not found.');
        if (maintenancePlanId) {
            const plan = await this.maintenancePlanRepository.findById(maintenancePlanId);
            if (!plan)
                throw new Error('Maintenance plan not found.');
        }
        let cart = await this.cartRepository.findActiveByClientId(client.id);
        if (cart) {
            // Si ya hay un carrito, lo actualizamos
            cart.serviceId = serviceId;
            cart.maintenancePlanId = maintenancePlanId || null;
            cart.updatedAt = new Date();
            await this.cartRepository.update(cart);
        }
        else {
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
//# sourceMappingURL=add-to-cart.use-case.js.map