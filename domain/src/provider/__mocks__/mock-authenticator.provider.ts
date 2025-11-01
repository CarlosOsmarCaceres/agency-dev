import { UserRole } from "../../entities/users/user.js";
import { IAuthenticator, ITokenPayload } from "../authenticator.provider.js";

export class MockAuthenticator implements IAuthenticator {

    async generateToken(payload: ITokenPayload): Promise<string> {
        return `token_for_${payload.id}`;
    }

    async verifyToken<T>(token: string): Promise<T | null> {
        // Simulamos un token inválido
        if (token === 'token_invalido') {
            return null;
        }
        // Simulamos un payload decodificado
        return { id: 'mock-id', role: 'CLIENT' } as T;
    }
}