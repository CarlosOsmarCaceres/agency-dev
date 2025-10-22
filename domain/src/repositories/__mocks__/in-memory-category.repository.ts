// Contratos   
import { Category } from "../../entities/catalog/category.js";
import { ICategoryRepository } from "../category.repository.js";

export class InMemoryCategoryRepository implements ICategoryRepository {
    public categories: Category[] = [];

    async findById(id: string): Promise<Category | null> {
        return this.categories.find(c => c.id === id) || null;
    }

    async findByName(name: string): Promise<Category | null> {
        return this.categories.find(c => c.name === name) || null;
    }
    
    async save(category: Category): Promise<Category> {
        this.categories.push(category);
        return category;
    }
}