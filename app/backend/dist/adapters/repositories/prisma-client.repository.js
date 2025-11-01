import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// --- Funciones de Traducción ---
// Mapea un objeto Client de Prisma a un objeto Client del Dominio
// En este caso, son casi idénticos, pero es buena práctica mantener la traducción
function toDomainClient(prismaClient) {
    return {
        id: prismaClient.id,
        companyName: prismaClient.companyName || undefined, // Asegura que null se convierta en undefined si es opcional
        contactPhone: prismaClient.contactPhone,
        userId: prismaClient.userId,
    };
}
// --- Fin de Funciones de Traducción ---
export class PrismaClientRepository {
    async findByUserId(userId) {
        const client = await prisma.client.findUnique({
            where: { userId },
        });
        return client ? toDomainClient(client) : null;
    }
    async save(client) {
        const newClient = await prisma.client.create({
            data: {
                id: client.id,
                companyName: client.companyName,
                contactPhone: client.contactPhone,
                userId: client.userId,
            },
        });
        return toDomainClient(newClient);
    }
    async update(client) {
        const updatedClient = await prisma.client.update({
            where: { id: client.id },
            data: {
                companyName: client.companyName,
                contactPhone: client.contactPhone,
            },
        });
        return toDomainClient(updatedClient);
    }
}
