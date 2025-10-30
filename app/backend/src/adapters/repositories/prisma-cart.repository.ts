import { PrismaClient, Cart as PrismaCart, CartStatus as PrismaCartStatus } from '@prisma/client';
// Asumiendo alias o rutas relativas correctas
import { Cart, CartStatus, CartStatuses } from '../../../../../domain/dist/entities/business/cart.js';
import { ICartRepository } from '../../../../../domain/dist/repositories/cart.repository.js';

const prisma = new PrismaClient();

// --- Funciones de Traducción ---

/**
 * Traduce el estado del carrito de Prisma (DB) al Dominio (Negocio)
 */
function toDomainCartStatus(prismaStatus: PrismaCartStatus): CartStatus {
    switch (prismaStatus) {
        case 'ACTIVE':
            return CartStatuses.ACTIVE; // "Activo"
        case 'CONVERTED':
            return CartStatuses.CONVERTED; // "Convertido"
        case 'ABANDONED':
            return CartStatuses.ABANDONED; // "Abandonado"
        default:
            throw new Error(`Estado de carrito desconocido: ${prismaStatus}`);
    }
}

/**
 * Traduce el estado del carrito del Dominio (Negocio) a Prisma (DB)
 */
function toPrismaCartStatus(domainStatus: CartStatus): PrismaCartStatus {
    switch (domainStatus) {
        case CartStatuses.ACTIVE:
            return 'ACTIVE';
        case CartStatuses.CONVERTED:
            return 'CONVERTED';
        case CartStatuses.ABANDONED:
            return 'ABANDONED';
        default:
            throw new Error(`Estado de carrito de dominio desconocido: ${domainStatus}`);
    }
}

/**
 * Mapea un objeto Cart de Prisma a uno del Dominio
 */
function toDomainCart(prismaCart: PrismaCart): Cart {
    return {
        id: prismaCart.id,
        clientId: prismaCart.clientId,
        status: toDomainCartStatus(prismaCart.status), // Traduce el enum
        serviceId: prismaCart.serviceId, // Prisma maneja null
        maintenancePlanId: prismaCart.maintenancePlanId, // Prisma maneja null
        createdAt: prismaCart.createdAt,
        updatedAt: prismaCart.updatedAt,
    };
}
// --- Fin de Funciones de Traducción ---

export class PrismaCartRepository implements ICartRepository {

    async findActiveByClientId(clientId: string): Promise<Cart | null> {
        const cart = await prisma.cart.findFirst({
            where: {
                clientId: clientId,
                status: 'ACTIVE', // Buscamos directamente por el estado 'ACTIVE' de Prisma
            },
        });
        return cart ? toDomainCart(cart) : null;
    }

    async save(cart: Cart): Promise<Cart> {
        const newCart = await prisma.cart.create({
            data: {
                id: cart.id, // Asumimos que el ID viene del caso de uso (uuid)
                clientId: cart.clientId,
                status: toPrismaCartStatus(cart.status), // Traduce el enum
                serviceId: cart.serviceId,
                maintenancePlanId: cart.maintenancePlanId,
                createdAt: cart.createdAt,
                updatedAt: cart.updatedAt,
            },
        });
        return toDomainCart(newCart);
    }

    async update(cart: Cart): Promise<Cart> {
        const updatedCart = await prisma.cart.update({
            where: { id: cart.id },
            data: {
                status: toPrismaCartStatus(cart.status), // Traduce el enum
                serviceId: cart.serviceId,
                maintenancePlanId: cart.maintenancePlanId,
                // Prisma actualiza 'updatedAt' automáticamente si está con @updatedAt
            },
        });
        return toDomainCart(updatedCart);
    }
}