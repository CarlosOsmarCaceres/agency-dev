// Importamos la instancia del caso de uso
import { addToCartUseCase } from '../dependencies.js';
export const addToCartController = async (req, res) => {
    try {
        // 1. Obtenemos el ID del Cliente (puesto por el authMiddleware)
        const actingUserId = req.user.id;
        // 2. Extraemos los IDs del servicio y (opcional) del plan
        const { serviceId, maintenancePlanId } = req.body;
        if (!serviceId) {
            return res.status(400).json({ error: 'El "serviceId" es requerido.' });
        }
        // 3. Preparamos el input para el caso de uso
        const input = {
            actingUserId,
            serviceId,
            maintenancePlanId // Será 'undefined' si no se envía, lo cual es correcto
        };
        // 4. Llamamos al caso de uso
        const cart = await addToCartUseCase.execute(input);
        // 5. Enviamos la respuesta exitosa
        return res.status(200).json(cart); // 200 OK (actualiza o crea)
    }
    catch (error) {
        // 6. Manejamos los errores
        if (error instanceof Error) {
            if (error.message.includes('not found')) {
                // Si el servicio, plan, usuario o cliente no existen
                return res.status(404).json({ error: error.message }); // 404 Not Found
            }
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};
