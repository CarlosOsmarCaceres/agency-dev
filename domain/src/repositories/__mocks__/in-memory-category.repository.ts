// Contratos   
import { Category } from "../../entities/catalog/category.js";
import { ICategoryRepository } from "../category.repository.js";

export class InMemoryCategoryRepository implements ICategoryRepository {
    public categories: Category[] = [];

    async findAll(): Promise<Category[]> {
        return this.categories;
    }

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

    async update(category: Category): Promise<Category> {
        const index = this.categories.findIndex(c => c.id === category.id);
        if (index !== -1) {
            this.categories[index] = { ...this.categories[index], ...category };
        }
        return category;
    }

    async delete(id: string): Promise<void> {
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            this.categories.splice(index, 1);
        }
    }
}