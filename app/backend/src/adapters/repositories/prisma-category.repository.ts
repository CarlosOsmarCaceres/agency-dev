import { PrismaClient, Category as PrismaCategory } from '@prisma/client';
// Asumiendo alias o rutas relativas correctas
import { Category } from '../../../../../domain/dist/entities/catalog/category.js';
import { ICategoryRepository } from '../../../../../domain/dist/repositories/category.repository.js';

const prisma = new PrismaClient();

// --- Funciones de Traducción ---
// Mapea un objeto Category de Prisma a un objeto Category del Dominio
// En este caso, son idénticos, pero mantenemos el patrón.
function toDomainCategory(prismaCategory: PrismaCategory): Category {
    return {
        id: prismaCategory.id,
        name: prismaCategory.name,
        description: prismaCategory.description,
    };
}
// --- Fin de Funciones de Traducción ---

export class PrismaCategoryRepository implements ICategoryRepository {

    async findAll(): Promise<Category[]> {
        const categories = await prisma.category.findMany();
        return categories.map(toDomainCategory); // Mapea cada ítem de la lista
    }

    async findById(id: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: { id },
        });
        return category ? toDomainCategory(category) : null;
    }

    async findByName(name: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: { name },
        });
        return category ? toDomainCategory(category) : null;
    }

    async save(category: Category): Promise<Category> {
        const newCategory = await prisma.category.create({
            data: {
                id: category.id, // Asumimos que el ID se genera en el caso de uso (con uuid)
                name: category.name,
                description: category.description,
            },
        });
        return toDomainCategory(newCategory);
    }
}