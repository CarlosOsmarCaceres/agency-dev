import { UserRole } from "../../entities/users/user.js";
import { IAuthenticator, ITokenPayload } from "../authenticator.provider.js";

export class MockAuthenticator implements IAuthenticator {
    async generateToken(payload: ITokenPayload): Promise<string> {
        return `token_for_${payload.id}`;
    }
}