import { Category } from "../../entities/catalog/category.js";
import { ICategoryRepository } from "../category.repository.js";
export declare class InMemoryCategoryRepository implements ICategoryRepository {
    categories: Category[];
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    save(category: Category): Promise<Category>;
}
//# sourceMappingURL=in-memory-category.repository.d.ts.map