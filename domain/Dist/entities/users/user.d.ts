import { Entity } from "../../utils/type/entity.js";
export declare const UserRoles: {
    readonly ADMIN: "Administrador";
    readonly SALESPERSON: "Vendedor";
    readonly CLIENT: "Cliente";
};
export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
export interface User extends Entity {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
}
//# sourceMappingURL=user.d.ts.map