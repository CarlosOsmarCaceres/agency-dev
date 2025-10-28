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
}
//# sourceMappingURL=in-memory-category.repository.js.map