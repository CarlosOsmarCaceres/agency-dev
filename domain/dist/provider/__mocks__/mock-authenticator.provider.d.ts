import { IAuthenticator, ITokenPayload } from "../authenticator.provider.js";
export declare class MockAuthenticator implements IAuthenticator {
    generateToken(payload: ITokenPayload): Promise<string>;
    verifyToken<T>(token: string): Promise<T | null>;
}
//# sourceMappingURL=mock-authenticator.provider.d.ts.map