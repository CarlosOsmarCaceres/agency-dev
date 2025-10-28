export class ViewCartUseCase {
    userRepository;
    clientRepository;
    cartRepository;
    serviceRepository;
    maintenancePlanRepository;
    constructor(userRepository, clientRepository, cartRepository, serviceRepository, maintenancePlanRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.cartRepository = cartRepository;
        this.serviceRepository = serviceRepository;
        this.maintenancePlanRepository = maintenancePlanRepository;
    }
    async execute(input) {
        const user = await this.userRepository.findById(input.actingUserId);
        if (!user)
            throw new Error('User not found.');
        const client = await this.clientRepository.findByUserId(user.id);
        if (!client)
            throw new Error('Client profile not found.');
        const cart = await this.cartRepository.findActiveByClientId(client.id);
        if (!cart) {
            return null; // El usuario no tiene un carrito activo
        }
        let service = null;
        if (cart.serviceId) {
            service = await this.serviceRepository.findById(cart.serviceId);
        }
        let maintenancePlan = null;
        if (cart.maintenancePlanId) {
            maintenancePlan = await this.maintenancePlanRepository.findById(cart.maintenancePlanId);
        }
        // Construimos el objeto de respuesta detallado
        const detailedCart = {
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
//# sourceMappingURL=view-cart.use-case.js.map