import { Entity } from "../../utils/type/entity.js";
import { Category } from "./category.js";
export interface Service extends Entity {
    name: string;
    description: string;
    price: number;
    categoryId: Category['id'];
}
//# sourceMappingURL=service.d.ts.map