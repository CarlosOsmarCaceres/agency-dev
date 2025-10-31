import { Entity } from "../../utils/type/entity.js";
import { Client } from "../users/client.js";
import { MaintenancePlan } from "../catalog/maintenance-plan.js";
import { Service } from "../catalog/service.js";
import { User } from "../users/user.js";
export declare const ProjectStatuses: {
    readonly PENDING: "Pendiente";
    readonly IN_PROGRESS: "En Progreso";
    readonly COMPLETED: "Completado";
    readonly CANCELLED: "Cancelado";
};
export type ProjectStatus = (typeof ProjectStatuses)[keyof typeof ProjectStatuses];
export interface Project extends Entity {
    name: string;
    status: ProjectStatus;
    clientId: Client['id'];
    serviceId: Service['id'];
    maintenancePlanId?: MaintenancePlan['id'] | null;
    assignedToId?: User['id'];
    finalPrice: number;
    startDate: Date;
    estimatedCompletionDate: Date;
}
//# sourceMappingURL=project.d.ts.map