import { Prisma, PrismaClient, Service as PrismaService } from '@prisma/client';
// Asumiendo alias o rutas relativas correctas
import { Service } from '../../../../../domain/dist/entities/catalog/service.js';
import { IServiceRepository, ServiceFilters } from '../../../../../domain/dist/repositories/service.repository.js';

const prisma = new PrismaClient();

// --- Función de Traducción ---
// Mapea un objeto Service de Prisma a un objeto Service del Dominio
function toDomainService(prismaService: PrismaService): Service {
    return {
        id: prismaService.id,
        name: prismaService.name,
        description: prismaService.description,
        price: prismaService.price, // Prisma maneja Float/Decimal correctamente
        categoryId: prismaService.categoryId,
    };
}
// --- Fin de Función de Traducción ---

export class PrismaServiceRepository implements IServiceRepository {

    async findAll(filters?: ServiceFilters): Promise<Service[]> {
        // Construimos la cláusula 'where' de Prisma basada en los filtros
const whereClause: Prisma.ServiceWhereInput = {}; // Ya no es '{}'

        if (filters?.categoryId) {
            // 3. Ahora TypeScript sabe que 'categoryId' es una propiedad válida
            whereClause.categoryId = filters.categoryId; // ✅ OK
        }

        const services = await prisma.service.findMany({
            where: whereClause,
        });
        
        return services.map(toDomainService);
    }

    async findById(id: string): Promise<Service | null> {
        const service = await prisma.service.findUnique({
            where: { id },
        });
        return service ? toDomainService(service) : null;
    }

    async save(service: Service): Promise<Service> {
        const newService = await prisma.service.create({
            data: {
                id: service.id, // Asumimos que el ID viene del caso de uso (uuid)
                name: service.name,
                description: service.description,
                price: service.price,
                categoryId: service.categoryId,
            },
        });
        return toDomainService(newService);
    }

    async update(service: Service): Promise<Service> {
        const updatedService = await prisma.service.update({
            where: { id: service.id },
            data: {
                name: service.name,
                description: service.description,
                price: service.price,
                // Generalmente no permitimos cambiar la categoría, pero se podría añadir
            },
        });
        return toDomainService(updatedService);
    }
}