export const UserRole = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    CONSUMER: 'CONSUMER'
} as const;


export  type USerRo = typeof UserRole[keyof typeof UserRole];

export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: USerRo;
}