export class RemoveFromCartUseCase {
    userRepository;
    clientRepository;
    cartRepository;
    constructor(userRepository, clientRepository, cartRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.cartRepository = cartRepository;
    }
    async execute(input) {
        const { actingUserId, itemToRemove } = input;
        const user = await this.userRepository.findById(actingUserId);
        if (!user)
            throw new Error('User not found.');
        const client = await this.clientRepository.findByUserId(user.id);
        if (!client)
            throw new Error('Client profile not found.');
        const cart = await this.cartRepository.findActiveByClientId(client.id);
        if (!cart) {
            return null; // No hay carrito para modificar
        }
        // --- LÓGICA DE ACTUALIZACIÓN ---
        if (itemToRemove === 'service') {
            // Si se elimina el servicio, se elimina todo
            cart.serviceId = null;
            cart.maintenancePlanId = null;
        }
        else if (itemToRemove === 'maintenancePlan') {
            // Si se elimina el plan, solo se quita el plan
            cart.maintenancePlanId = null;
        }
        cart.updatedAt = new Date();
        await this.cartRepository.update(cart);
        return cart;
    }
}
//# sourceMappingURL=remove-from-cart.use-case.js.map