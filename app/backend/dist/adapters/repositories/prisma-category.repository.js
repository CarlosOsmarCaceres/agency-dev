import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// --- Funciones de Traducción ---
// Mapea un objeto Category de Prisma a un objeto Category del Dominio
// En este caso, son idénticos, pero mantenemos el patrón.
function toDomainCategory(prismaCategory) {
    return {
        id: prismaCategory.id,
        name: prismaCategory.name,
        description: prismaCategory.description,
    };
}
// --- Fin de Funciones de Traducción ---
export class PrismaCategoryRepository {
    async findAll() {
        const categories = await prisma.category.findMany();
        return categories.map(toDomainCategory); // Mapea cada ítem de la lista
    }
    async findById(id) {
        const category = await prisma.category.findUnique({
            where: { id },
        });
        return category ? toDomainCategory(category) : null;
    }
    async findByName(name) {
        const category = await prisma.category.findUnique({
            where: { name },
        });
        return category ? toDomainCategory(category) : null;
    }
    async save(category) {
        const newCategory = await prisma.category.create({
            data: {
                id: category.id, // Asumimos que el ID se genera en el caso de uso (con uuid)
                name: category.name,
                description: category.description,
            },
        });
        return toDomainCategory(newCategory);
    }
    async update(category) {
        const updatedCategory = await prisma.category.update({
            where: { id: category.id },
            data: {
                name: category.name,
                description: category.description,
            },
        });
        return toDomainCategory(updatedCategory);
    }
    // 👇 IMPLEMENTACIÓN DE DELETE
    async delete(id) {
        await prisma.category.delete({
            where: { id },
        });
    }
}
