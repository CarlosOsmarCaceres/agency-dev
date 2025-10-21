import { Entity } from "../utils/type/entity.js";
import { PlansType } from "./plans.js";



/* Mnatenimientos */
export const MaintenanceService = {
    monthly: "MENSUAL",
    quarterly: "TRIMESTRAL",
    biannual: "SEMESTRAL",
    annual: "ANUAL",
} as const

export type MaintenanceServiceType = (typeof MaintenanceService) [keyof typeof MaintenanceService];

export interface MaintenanceServiceEntity extends Entity {
    title: MaintenanceServiceType;
    subtitle: string;
    description: string;
    price: number;
}


/* Categorias */
export const CategoryWebsite = {
    corporate: "Web Corporativa",
    store: "Tienda Online",
    academy: "Academia Online",
    consecionari: "Web Concesionario",
    restaurant: "Web Restaurante",
} as const

export type CategoryWebsiteType = (typeof CategoryWebsite) [keyof typeof CategoryWebsite];

export interface CategoryWebsiteEntity extends Entity   {
    title: CategoryWebsiteType;
    subtitle: string;
    description: string;
}
/***************************************/

/* Servicios */
export interface Services extends Entity {
    title: string;
    subtitle: string;
    description: string;
    price: number;
    categoryId: string;
    plans: PlansType[];
    maintenance?: boolean;
}
/***************************************/