import { Entity } from "../utils";

/* Planes */
export const Plans = {
    basic: "INICIAL",
    standard: "ESTÁNDAR",
    premium: "PREMIUM",
} as const

export type PlansType = (typeof Plans) [keyof typeof Plans];

export interface PlansEntity extends Entity {
    title: PlansType;
    subTitle: string;
    description: string;
    price: number;
    features: string[];
}  
/***************************************/