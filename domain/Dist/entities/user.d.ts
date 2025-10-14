export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
    readonly CONSUMER: "CONSUMER";
};
export type USerRo = typeof UserRole[keyof typeof UserRole];
export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: USerRo;
}
//# sourceMappingURL=user.d.ts.map