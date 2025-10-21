import { Entity } from "../../utils/type/entity.js";

// La categoría agrupa los servicios. "Tienda Online", "Web Corporativa", etc.
export interface Category extends Entity {
    name: string;
    description: string;
}