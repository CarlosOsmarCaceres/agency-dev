import { Request, Response } from 'express';
import { updateCategoryUseCase } from '../dependencies.js';
import { UpdateCategoryInput } from '../../../../domain/dist/use-cases/catalog/update-category.use-case.js';

export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        // 1. Obtenemos el ID del usuario (Admin o Vendedor)
        const actingUserId = req.user!.id;
        
        // 2. Obtenemos el ID de la categoría de la URL
        const { id: categoryId } = req.params;

        // 3. Obtenemos los datos a actualizar
        const { name, description } = req.body;

        const input: UpdateCategoryInput = {
            actingUserId,
            categoryId: categoryId as string,
            data: {
                name,
                description
            }
        };

        // 4. Ejecutamos el caso de uso
        const updatedCategory = await updateCategoryUseCase.execute(input);

        // 5. Retornamos éxito
        return res.status(200).json(updatedCategory);

    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message });
            }
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido.' });
    }
};