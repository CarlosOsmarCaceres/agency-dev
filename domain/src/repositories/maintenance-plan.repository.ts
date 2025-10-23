import { MaintenancePlan } from "../entities/catalog/maintenance-plan.js";

export interface IMaintenancePlanRepository {
    findById(id: string): Promise<MaintenancePlan | null>;
    save(plan: MaintenancePlan): Promise<MaintenancePlan>; // Necesario para los tests
}