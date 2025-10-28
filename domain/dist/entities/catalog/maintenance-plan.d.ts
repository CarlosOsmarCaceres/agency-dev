import { Entity } from "../../utils/type/entity.js";
export declare const MaintenancePlanLevels: {
    readonly BASIC: "INICIAL";
    readonly STANDARD: "ESTÁNDAR";
    readonly PREMIUM: "PREMIUM";
};
export type MaintenancePlanLevel = (typeof MaintenancePlanLevels)[keyof typeof MaintenancePlanLevels];
export interface MaintenancePlan extends Entity {
    level: MaintenancePlanLevel;
    description: string;
    monthlyPrice: number;
    features: string[];
}
//# sourceMappingURL=maintenance-plan.d.ts.map