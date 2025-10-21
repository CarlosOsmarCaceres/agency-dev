import { UserRole } from "../entities/users/user.js";
export interface ITokenPayload {
    id: string;
    role: UserRole;
}
export interface IAuthenticator {
    generateToken(payload: ITokenPayload): Promise<string>;
    verifyToken?(token: string): Promise<ITokenPayload | null>;
}
//# sourceMappingURL=authenticator.d.ts.map