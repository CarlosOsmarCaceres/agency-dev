import { UserRole } from "../entities/users/user.js";

// El "payload" es la información que guardamos dentro del token
export interface ITokenPayload {
    id: string;
    role: UserRole;
}

export interface IAuthenticator {
    generateToken(payload: ITokenPayload): Promise<string>;
    verifyToken<T>(token: string): Promise<ITokenPayload | null>; // El '?' lo hace opcional por ahora
}