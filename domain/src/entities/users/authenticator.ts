import { UserRole } from "./user.js";

export interface IAuthenticator {
    generateToken(payload: { id: string; role: UserRole }): Promise<string>;
    verifyToken?<T>(token: string): Promise<T | null>; // Opcional, pero útil para el futuro
}