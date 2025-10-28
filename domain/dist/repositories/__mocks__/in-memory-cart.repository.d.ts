import { Cart } from "../../entities/business/cart.js";
import { ICartRepository } from "../cart.repository.js";
export declare class InMemoryCartRepository implements ICartRepository {
    carts: Cart[];
    findById(id: string): Promise<Cart | null>;
    findActiveByClientId(clientId: string): Promise<Cart | null>;
    save(cart: Cart): Promise<Cart>;
    update(cart: Cart): Promise<Cart>;
}
//# sourceMappingURL=in-memory-cart.repository.d.ts.map