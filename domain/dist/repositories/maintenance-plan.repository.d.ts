import { MaintenancePlan } from "../entities/catalog/maintenance-plan.js";
export interface IMaintenancePlanRepository {
    findById(id: string): Promise<MaintenancePlan | null>;
    save(plan: MaintenancePlan): Promise<MaintenancePlan>;
}
//# sourceMappingURL=maintenance-plan.repository.d.ts.map