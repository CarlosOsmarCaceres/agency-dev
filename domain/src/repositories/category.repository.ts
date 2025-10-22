import { Category } from "../entities/catalog/category.entity.js";

export interface ICategoryRepository {
    findByName(name: string): Promise<Category | null>;
    save(category: Category): Promise<Category>;
}