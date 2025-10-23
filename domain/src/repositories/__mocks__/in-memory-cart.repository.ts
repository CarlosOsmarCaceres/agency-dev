import { Cart } from "../../entities/business/cart.js";
import { ICartRepository } from "../cart.repository.js";

export class InMemoryCartRepository implements ICartRepository {
    public carts: Cart[] = [];

    async findById(id: string): Promise<Cart | null> {
        return this.carts.find(cart => cart.id === id) || null;
    }

    async findActiveByClientId(clientId: string): Promise<Cart | null> {
        return this.carts.find(cart => cart.clientId === clientId && cart.status === 'Activo') || null;
    }
    
    async save(cart: Cart): Promise<Cart> {
        this.carts.push(cart);
        return cart;
    }

    async update(cart: Cart): Promise<Cart> {
        const index = this.carts.findIndex(c => c.id === cart.id);
        if (index !== -1) {
            this.carts[index] = cart;
        }
        return cart;
    }
}