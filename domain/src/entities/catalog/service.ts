import { Entity } from "../../utils/type/entity.js";
import { Category } from "./category.js";


export interface Service extends Entity {
    name: string;
    description: string;
    price: number; // El precio del desarrollo inicial.
    categoryId: Category['id']; // A qué categoría pertenece.
}