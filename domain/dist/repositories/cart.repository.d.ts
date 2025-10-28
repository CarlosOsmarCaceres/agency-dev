import { Cart } from "../entities/business/cart.js";
export interface ICartRepository {
    findById(id: string): Promise<Cart | null>;
    findActiveByClientId(clientId: string): Promise<Cart | null>;
    save(cart: Cart): Promise<Cart>;
    update(cart: Cart): Promise<Cart>;
}
//# sourceMappingURL=cart.repository.d.ts.map