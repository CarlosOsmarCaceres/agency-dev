export class ListCategoriesUseCase {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute() {
        const categories = await this.categoryRepository.findAll();
        return categories;
    }
}
//# sourceMappingURL=list-categories.use-case.js.map