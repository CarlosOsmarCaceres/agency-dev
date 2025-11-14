// Importamos la instancia del caso de uso
import { createServiceUseCase } from '../dependencies.js';
export const createServiceController = async (req, res) => {
    try {
        // 1. Obtenemos el ID del Admin (puesto por el authMiddleware)
        const actingUserId = req.user.id;
        // 2. Extraemos los datos del body
        const { name, description, price, categoryId } = req.body;
        if (!name || !description || !price || !categoryId) {
            return res.status(400).json({ error: 'Faltan datos (name, description, price, categoryId).' });
        }
        // 3. Preparamos el input para el caso de uso
        const input = {
            actingUserId,
            name,
            description,
            price: Number(price), // Aseguramos que el precio sea un número
            categoryId
        };
        // 4. Llamamos al caso de uso
        const newService = await createServiceUseCase.execute(input);
        // 5. Enviamos la respuesta exitosa
        return res.status(201).json(newService);
    }
    catch (error) {
        // 6. Manejamos los errores
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message }); // 403 Forbidden
            }
            if (error.message.includes('Category not found')) {
                return res.status(404).json({ error: error.message }); // 404 Not Found
            }
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};
