import { IAuthenticator, ITokenPayload } from "../authenticator.provider.js";
export declare class MockAuthenticator implements IAuthenticator {
    generateToken(payload: ITokenPayload): Promise<string>;
}
//# sourceMappingURL=mock-authenticator.provider.d.ts.map