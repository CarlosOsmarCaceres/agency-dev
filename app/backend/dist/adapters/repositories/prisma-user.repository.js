import { PrismaClient } from '@prisma/client';
// Asumiendo que ya configuraste el alias @agency/domain
import { UserRoles } from '../../../../../domain/dist/entities/users/user.js';
// Instancia de Prisma (mejor si es un Singleton, pero esto funciona)
const prisma = new PrismaClient();
// --- FUNCIONES DE TRADUCCIÓN ---
// Esto es el corazón del patrón Adaptador
/**
 * Convierte un rol de Prisma (DB) a un rol del Dominio (Negocio)
 */
function toDomainRole(prismaRole) {
    switch (prismaRole) {
        case 'ADMIN':
            return UserRoles.ADMIN; // Devuelve "Administrador"
        case 'SALESPERSON':
            return UserRoles.SALESPERSON; // Devuelve "Vendedor"
        case 'CLIENT':
            return UserRoles.CLIENT; // Devuelve "Cliente"
        default:
            // Asegura que si se añade un rol en Prisma, esto falle y nos alerte
            throw new Error(`Rol de Prisma desconocido: ${prismaRole}`);
    }
}
/**
 * Convierte un rol del Dominio (Negocio) a un rol de Prisma (DB)
 */
function toPrismaRole(domainRole) {
    switch (domainRole) {
        case UserRoles.ADMIN:
            return 'ADMIN';
        case UserRoles.SALESPERSON:
            return 'SALESPERSON';
        case UserRoles.CLIENT:
            return 'CLIENT';
        default:
            throw new Error(`Rol de dominio desconocido: ${domainRole}`);
    }
}
/**
 * Mapea un objeto User completo de Prisma a un objeto User del Dominio
 */
function toDomainUser(prismaUser) {
    return {
        ...prismaUser,
        role: toDomainRole(prismaUser.role) // Traduce el rol
    };
}
// --- FIN DE FUNCIONES DE TRADUCCIÓN ---
export class PrismaUserRepository {
    async findAll() {
        const users = await prisma.user.findMany();
        // Mapeamos cada usuario de Prisma al tipo del Dominio
        return users.map(toDomainUser);
    }
    async findById(id) {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        // Si encontramos un usuario, lo traducimos antes de devolverlo
        return user ? toDomainUser(user) : null;
    }
    async findByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user ? toDomainUser(user) : null;
    }
    async save(user) {
        const newUser = await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                passwordHash: user.passwordHash,
                role: toPrismaRole(user.role), // Traducimos el rol al guardarlo
                createdAt: user.createdAt,
            },
        });
        return toDomainUser(newUser); // Devolvemos el usuario traducido
    }
    async update(user) {
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                passwordHash: user.passwordHash,
                role: toPrismaRole(user.role), // Traducimos el rol al actualizar
            },
        });
        return toDomainUser(updatedUser);
    }
    async delete(id) {
        await prisma.user.delete({
            where: { id },
        });
    }
    async findByClientId(clientId) {
        const client = await prisma.client.findUnique({
            where: { id: clientId },
            include: { user: true }, // Prisma hace el JOIN por nosotros
        });
        // Si el cliente existe y tiene un usuario, lo traducimos
        return client?.user ? toDomainUser(client.user) : null;
    }
}
