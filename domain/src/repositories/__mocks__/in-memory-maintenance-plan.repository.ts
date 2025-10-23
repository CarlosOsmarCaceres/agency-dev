import { MaintenancePlan } from "../../entities/catalog/maintenance-plan.js";
import { IMaintenancePlanRepository } from "../maintenance-plan.repository.js";

export class InMemoryMaintenancePlanRepository implements IMaintenancePlanRepository {
    public plans: MaintenancePlan[] = [];

    async findById(id: string): Promise<MaintenancePlan | null> {
        return this.plans.find(plan => plan.id === id) || null;
    }
    
    async save(plan: MaintenancePlan): Promise<MaintenancePlan> {
        this.plans.push(plan);
        return plan;
    }
}
