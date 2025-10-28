import { UserRole } from "./user.js";
export interface IAuthenticator {
    generateToken(payload: {
        id: string;
        role: UserRole;
    }): Promise<string>;
    verifyToken?<T>(token: string): Promise<T | null>;
}
//# sourceMappingURL=authenticator.d.ts.map