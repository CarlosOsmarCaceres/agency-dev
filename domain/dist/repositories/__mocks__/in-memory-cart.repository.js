export class InMemoryCartRepository {
    carts = [];
    async findById(id) {
        return this.carts.find(cart => cart.id === id) || null;
    }
    async findActiveByClientId(clientId) {
        return this.carts.find(cart => cart.clientId === clientId && cart.status === 'Activo') || null;
    }
    async save(cart) {
        this.carts.push(cart);
        return cart;
    }
    async update(cart) {
        const index = this.carts.findIndex(c => c.id === cart.id);
        if (index !== -1) {
            this.carts[index] = cart;
        }
        return cart;
    }
}
//# sourceMappingURL=in-memory-cart.repository.js.map