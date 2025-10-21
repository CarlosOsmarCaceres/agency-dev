import { Entity } from "../utils/type/entity.js";
// Tipos para los roles que ya discutimos. Es bueno tenerlos cerca de User.
export const UserRoles = {
    ADMIN: "Administrador",
    SALESPERSON: "Vendedor",
    CLIENT: "Cliente",
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

// La entidad User se encarga del acceso y los permisos.
export interface User extends Entity {
    name: string;
    email: string;
    passwordHash: string; // La contraseña siempre encriptada
    role: UserRole;
    createdAt: Date;
}