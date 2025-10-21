import { Entity } from "../../utils/type/entity.js";
import { Client } from "../users/client.js";
import { MaintenancePlan } from "../catalog/maintenance-plan.js";
import { Service } from "../catalog/service.js";
import { User } from "../users/user.js";

// Tipos para el estado del proyecto.
export const ProjectStatuses = {
    PENDING: "Pendiente",
    IN_PROGRESS: "En Progreso",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
} as const;

export type ProjectStatus = (typeof ProjectStatuses)[keyof typeof ProjectStatuses];

// El Project es la instancia de un servicio contratado por un cliente.
export interface Project extends Entity {
    name: string; // Ej: "Rediseño Web para TechCorp"
    status: ProjectStatus;

    clientId: Client['id']; // El cliente dueño del proyecto.
    serviceId: Service['id']; // El servicio del catálogo en el que se basa.
    
    // El plan de mantenimiento es opcional en la contratación.
    maintenancePlanId: MaintenancePlan['id'] | null;
    
    // Quién del equipo está asignado. Puede estar vacío al principio.
    assignedToId?: User['id']; // El ID de un 'Vendedor' o 'Admin'.

    finalPrice: number; // El precio final pactado (puede tener descuentos).
    startDate: Date;
    estimatedCompletionDate: Date;
}