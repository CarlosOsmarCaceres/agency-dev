import { MaintenancePlan } from "../../entities/catalog/maintenance-plan.js";
import { IMaintenancePlanRepository } from "../maintenance-plan.repository.js";
export declare class InMemoryMaintenancePlanRepository implements IMaintenancePlanRepository {
    plans: MaintenancePlan[];
    findById(id: string): Promise<MaintenancePlan | null>;
    save(plan: MaintenancePlan): Promise<MaintenancePlan>;
}
//# sourceMappingURL=in-memory-maintenance-plan.repository.d.ts.map