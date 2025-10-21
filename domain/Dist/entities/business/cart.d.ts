import { Entity } from "../../utils/type/entity.js";
import { Client } from "../users/client.js";
import { MaintenancePlan } from "../catalog/maintenance-plan.js";
import { Service } from "../catalog/service.js";
export declare const CartStatuses: {
    readonly ACTIVE: "Activo";
    readonly CONVERTED: "Convertido";
    readonly ABANDONED: "Abandonado";
};
export type CartStatus = (typeof CartStatuses)[keyof typeof CartStatuses];
export interface Cart extends Entity {
    clientId: Client['id'];
    status: CartStatus;
    serviceId: Service['id'] | null;
    maintenancePlanId: MaintenancePlan['id'] | null;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=cart.d.ts.map