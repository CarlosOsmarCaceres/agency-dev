import { Request, Response } from 'express';
// Importamos la instancia de nuestro caso de uso
import { listCategoriesUseCase } from '../dependencies.js';

export const listCategoriesController = async (req: Request, res: Response) => {
    try {
        // 1. No necesitamos 'input' ya que es una lista pública
        const categories = await listCategoriesUseCase.execute();

        // 2. Enviamos la respuesta exitosa
        return res.status(200).json(categories);

    } catch (error) {
        // 3. Manejamos cualquier error inesperado del servidor
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};