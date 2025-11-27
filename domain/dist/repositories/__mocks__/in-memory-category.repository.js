export class InMemoryCategoryRepository {
    categories = [];
    async findAll() {
        return this.categories;
    }
    async findById(id) {
        return this.categories.find(c => c.id === id) || null;
    }
    async findByName(name) {
        return this.categories.find(c => c.name === name) || null;
    }
    async save(category) {
        this.categories.push(category);
        return category;
    }
    async update(category) {
        const index = this.categories.findIndex(c => c.id === category.id);
        if (index !== -1) {
            this.categories[index] = { ...this.categories[index], ...category };
        }
        return category;
    }
    async delete(id) {
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            this.categories.splice(index, 1);
        }
    }
}
//# sourceMappingURL=in-memory-category.repository.js.map