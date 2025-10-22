import { Category } from "../entities/catalog/category.js";

export interface ICategoryRepository {
    findById(id: string): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    save(category: Category): Promise<Category>;
}