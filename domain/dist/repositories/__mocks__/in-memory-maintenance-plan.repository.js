export class InMemoryMaintenancePlanRepository {
    plans = [];
    async findById(id) {
        return this.plans.find(plan => plan.id === id) || null;
    }
    async save(plan) {
        this.plans.push(plan);
        return plan;
    }
}
//# sourceMappingURL=in-memory-maintenance-plan.repository.js.map