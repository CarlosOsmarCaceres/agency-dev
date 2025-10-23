import { Cart } from "../entities/business/cart.js";

export interface ICartRepository {
    findActiveByClientId(clientId: string): Promise<Cart | null>;
    save(cart: Cart): Promise<Cart>;
    update(cart: Cart): Promise<Cart>;
}