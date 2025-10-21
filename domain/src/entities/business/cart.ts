import { Entity } from "../../utils/type/entity";
import { Client } from "../users/client";
import { MaintenancePlan } from "../catalog/maintenance-plan";
import { Service } from "../catalog/services";

export const CartStatuses = {
    ACTIVE: "Activo",           // El cliente está añadiendo cosas.
    CONVERTED: "Convertido",    // El carrito se convirtió en un Proyecto.
    ABANDONED: "Abandonado",    // El cliente lo dejó inactivo por mucho tiempo.
} as const;

export type CartStatus = (typeof CartStatuses)[keyof typeof CartStatuses];

// Representa la selección de un cliente antes de la compra final.
export interface Cart extends Entity {
    clientId: Client['id'];     // Cada carrito pertenece a un único cliente.
    status: CartStatus;

    // Puede tener un servicio principal seleccionado. Es 'null' si el carrito está vacío.
    serviceId: Service['id'] | null;
    
    // Puede tener un plan de mantenimiento opcional.
    maintenancePlanId: MaintenancePlan['id'] | null;

    createdAt: Date;
    updatedAt: Date;
}