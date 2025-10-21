import { Entity } from "../utils/type/entity";
import { User } from "./user";

// La entidad Client guarda datos específicos del cliente.
export interface Client extends Entity {
    userId: User['id']; // Se vincula a un User para el login.
    companyName?: string; // Puede ser un individuo o una empresa.
    contactPhone: string;
}