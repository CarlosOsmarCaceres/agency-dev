import { PrismaClient, MaintenancePlan as PrismaMaintenancePlan, MaintenancePlanLevel as PrismaMaintenancePlanLevel } from '@prisma/client';
// Asumiendo alias o rutas relativas correctas
import { MaintenancePlan, MaintenancePlanLevel, MaintenancePlanLevels } from '../../../../../domain/dist/entities/catalog/maintenance-plan.js';
import { IMaintenancePlanRepository } from '../../../../../domain/dist/repositories/maintenance-plan.repository.js';

const prisma = new PrismaClient();

// --- Funciones de Traducción ---

/**
 * Traduce el nivel del plan de Prisma (DB) al Dominio (Negocio)
 */
function toDomainMaintenancePlanLevel(prismaLevel: PrismaMaintenancePlanLevel): MaintenancePlanLevel {
    switch (prismaLevel) {
        case 'BASIC':
            return MaintenancePlanLevels.BASIC; // "INICIAL"
        case 'STANDARD':
            return MaintenancePlanLevels.STANDARD; // "ESTÁNDAR"
        case 'PREMIUM':
            return MaintenancePlanLevels.PREMIUM; // "PREMIUM"
        default:
            throw new Error(`Nivel de plan desconocido: ${prismaLevel}`);
    }
}

/**
 * Traduce el nivel del plan del Dominio (Negocio) a Prisma (DB)
 */
function toPrismaMaintenancePlanLevel(domainLevel: MaintenancePlanLevel): PrismaMaintenancePlanLevel {
    switch (domainLevel) {
        case MaintenancePlanLevels.BASIC:
            return 'BASIC';
        case MaintenancePlanLevels.STANDARD:
            return 'STANDARD';
        case MaintenancePlanLevels.PREMIUM:
            return 'PREMIUM';
        default:
            throw new Error(`Nivel de plan de dominio desconocido: ${domainLevel}`);
    }
}

/**
 * Mapea un objeto MaintenancePlan de Prisma a uno del Dominio
 */
function toDomainMaintenancePlan(prismaPlan: PrismaMaintenancePlan): MaintenancePlan {
    return {
        id: prismaPlan.id,
        level: toDomainMaintenancePlanLevel(prismaPlan.level), // Traduce el enum
        description: prismaPlan.description,
        monthlyPrice: prismaPlan.monthlyPrice,
        features: prismaPlan.features, // Prisma maneja arrays de string
    };
}
// --- Fin de Funciones de Traducción ---

export class PrismaMaintenancePlanRepository implements IMaintenancePlanRepository {

    async findById(id: string): Promise<MaintenancePlan | null> {
        const plan = await prisma.maintenancePlan.findUnique({
            where: { id },
        });
        return plan ? toDomainMaintenancePlan(plan) : null;
    }

    async save(plan: MaintenancePlan): Promise<MaintenancePlan> {
        const newPlan = await prisma.maintenancePlan.create({
            data: {
                id: plan.id, // Asumimos que el ID viene del caso de uso (uuid)
                level: toPrismaMaintenancePlanLevel(plan.level), // Traduce el enum
                description: plan.description,
                monthlyPrice: plan.monthlyPrice,
                features: plan.features,
            },
        });
        return toDomainMaintenancePlan(newPlan);
    }
    
    // Nota: La interfaz actual no requiere 'findAll' o 'update',
    // pero se podrían añadir fácilmente aquí si fueran necesarios.
}