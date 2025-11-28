import { PrismaClient } from '@prisma/client';
// Asumiendo alias o rutas relativas correctas
import { ProjectStatuses } from '../../../../../domain/dist/entities/business/project.js';
const prisma = new PrismaClient();
// --- Funciones de Traducción ---
/**
 * Traduce el estado del proyecto de Prisma (DB) al Dominio (Negocio)
 */
function toDomainProjectStatus(prismaStatus) {
    switch (prismaStatus) {
        case 'PENDING':
            return ProjectStatuses.PENDING; // "Pendiente"
        case 'IN_PROGRESS':
            return ProjectStatuses.IN_PROGRESS; // "En Progreso"
        case 'COMPLETED':
            return ProjectStatuses.COMPLETED; // "Completado"
        case 'CANCELLED':
            return ProjectStatuses.CANCELLED; // "Cancelado"
        default:
            throw new Error(`Estado de proyecto desconocido: ${prismaStatus}`);
    }
}
/**
 * Traduce el estado del proyecto del Dominio (Negocio) a Prisma (DB)
 */
function toPrismaProjectStatus(domainStatus) {
    switch (domainStatus) {
        case ProjectStatuses.PENDING:
            return 'PENDING';
        case ProjectStatuses.IN_PROGRESS:
            return 'IN_PROGRESS';
        case ProjectStatuses.COMPLETED:
            return 'COMPLETED';
        case ProjectStatuses.CANCELLED:
            return 'CANCELLED';
        default:
            throw new Error(`Estado de proyecto de dominio desconocido: ${domainStatus}`);
    }
}
/**
 * Mapea un objeto Project de Prisma a uno del Dominio
 */
function toDomainProject(prismaProject) {
    return {
        id: prismaProject.id,
        name: prismaProject.name,
        status: toDomainProjectStatus(prismaProject.status), // Traduce el enum
        finalPrice: prismaProject.finalPrice,
        startDate: prismaProject.startDate,
        estimatedCompletionDate: prismaProject.estimatedCompletionDate,
        clientId: prismaProject.clientId,
        serviceId: prismaProject.serviceId,
        maintenancePlanId: prismaProject.maintenancePlanId,
        assignedToId: prismaProject.assignedToId || undefined,
    };
}
// --- Fin de Funciones de Traducción ---
export class PrismaProjectRepository {
    async findAll() {
        const projects = await prisma.project.findMany();
        return projects.map(toDomainProject);
    }
    async findById(id) {
        const project = await prisma.project.findUnique({
            where: { id },
        });
        return project ? toDomainProject(project) : null;
    }
    async findByClientId(clientId) {
        const projects = await prisma.project.findMany({
            where: { clientId },
        });
        return projects.map(toDomainProject);
    }
    async save(project) {
        const newProject = await prisma.project.create({
            data: {
                id: project.id, // Asumimos que el ID viene del caso de uso (uuid)
                name: project.name,
                status: toPrismaProjectStatus(project.status), // Traduce el enum
                finalPrice: project.finalPrice,
                startDate: project.startDate,
                estimatedCompletionDate: project.estimatedCompletionDate,
                clientId: project.clientId,
                serviceId: project.serviceId,
                maintenancePlanId: project.maintenancePlanId,
                assignedToId: project.assignedToId,
            },
        });
        return toDomainProject(newProject);
    }
    async update(project) {
        const updatedProject = await prisma.project.update({
            where: { id: project.id },
            data: {
                name: project.name,
                status: toPrismaProjectStatus(project.status), // Traduce el enum
                finalPrice: project.finalPrice,
                estimatedCompletionDate: project.estimatedCompletionDate,
                maintenancePlanId: project.maintenancePlanId,
                assignedToId: project.assignedToId,
            },
        });
        return toDomainProject(updatedProject);
    }
}
