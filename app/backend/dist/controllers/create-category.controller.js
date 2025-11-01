// Importamos la instancia de nuestro caso de uso
import { createCategoryUseCase } from '../dependencies.js';
export const createCategoryController = async (req, res) => {
    try {
        // 1. Obtenemos el ID del usuario que actúa (puesto por el authMiddleware)
        const actingUserId = req.user.id;
        // 2. Extraemos los datos del body
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ error: 'Faltan datos (name, description).' });
        }
        const input = {
            actingUserId,
            name,
            description
        };
        // 3. Llamamos al caso de uso
        const newCategory = await createCategoryUseCase.execute(input);
        // 4. Enviamos la respuesta exitosa
        return res.status(201).json(newCategory);
    }
    catch (error) {
        // 5. Manejamos los errores
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message }); // 403 Forbidden
            }
            if (error.message.includes('already exists')) {
                return res.status(409).json({ error: error.message }); // 409 Conflict
            }
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};
