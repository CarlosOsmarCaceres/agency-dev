import { Entity } from "../utils/type/entity.js";

// El plan de mantenimiento es el producto RECURRENTE (mensual).
export const MaintenancePlanLevels = {
    BASIC: "INICIAL",
    STANDARD: "ESTÁNDAR",
    PREMIUM: "PREMIUM",
} as const;

export type MaintenancePlanLevel = (typeof MaintenancePlanLevels)[keyof typeof MaintenancePlanLevels];

export interface MaintenancePlan extends Entity {
    level: MaintenancePlanLevel; // INICIAL, ESTÁNDAR, PREMIUM
    description: string;
    monthlyPrice: number; // Precio de la suscripción mensual.
    features: string[]; // Ej: ["Soporte 24/7", "Backup semanal"]
}