import { PrismaClient, Project as PrismaProject, ProjectStatus as PrismaProjectStatus } from '@prisma/client';
// Asumiendo alias o rutas relativas correctas
import { Project, ProjectStatus, ProjectStatuses } from '../../../../../domain/dist/entities/business/project.js';
import { IProjectRepository } from '../../../../../domain/dist/repositories/project.repository.js';

const prisma = new PrismaClient();

// --- Funciones de Traducción ---

/**
 * Traduce el estado del proyecto de Prisma (DB) al Dominio (Negocio)
 */
function toDomainProjectStatus(prismaStatus: PrismaProjectStatus): ProjectStatus {
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
function toPrismaProjectStatus(domainStatus: ProjectStatus): PrismaProjectStatus {
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
function toDomainProject(prismaProject: PrismaProject): Project {
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

export class PrismaProjectRepository implements IProjectRepository {

    async findAll(): Promise<Project[]> {
        const projects = await prisma.project.findMany();
        return projects.map(toDomainProject);
    }

    async findById(id: string): Promise<Project | null> {
        const project = await prisma.project.findUnique({
            where: { id },
        });
        return project ? toDomainProject(project) : null;
    }

    async findByClientId(clientId: string): Promise<Project[]> {
        const projects = await prisma.project.findMany({
            where: { clientId },
        });
        return projects.map(toDomainProject);
    }

    async save(project: Project): Promise<Project> {
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

    async update(project: Project): Promise<Project> {
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