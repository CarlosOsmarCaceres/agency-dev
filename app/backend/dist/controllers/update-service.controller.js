// Importamos la instancia del caso de uso
import { updateServiceUseCase } from '../dependencies.js';
export const updateServiceController = async (req, res) => {
    try {
        // 1. Obtenemos el ID del usuario que actúa (puesto por el authMiddleware)
        const actingUserId = req.user.id;
        // 2. Obtenemos el ID del servicio de los parámetros de la URL
        const { id: serviceId } = req.params;
        // 3. Extraemos los datos a actualizar del body
        const { name, description, price } = req.body;
        // 4. Preparamos el input para el caso de uso
        const input = {
            actingUserId,
            serviceId: serviceId,
            data: {
                name,
                description,
                price: price ? Number(price) : undefined
            }
        };
        // 5. Llamamos al caso de uso
        const updatedService = await updateServiceUseCase.execute(input);
        // 6. Enviamos la respuesta exitosa
        return res.status(200).json(updatedService); // 200 OK
    }
    catch (error) {
        // 7. Manejamos los errores
        if (error instanceof Error) {
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message }); // 403 Forbidden
            }
            if (error.message.includes('Service not found')) {
                return res.status(404).json({ error: error.message }); // 404 Not Found
            }
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};
