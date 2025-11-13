// Importamos la instancia de nuestro caso de uso
import { listServicesUseCase } from '../dependencies.js';
export const listServicesController = async (req, res) => {
    try {
        // 1. Extraemos el filtro opcional de los query params (ej. /services?categoryId=abc)
        const { categoryId } = req.query;
        // 2. Preparamos el input para el caso de uso
        const input = {};
        if (typeof categoryId === 'string') {
            input.categoryId = categoryId;
        }
        // 3. Llamamos al caso de uso con el filtro (o un objeto vacío si no hay filtro)
        const services = await listServicesUseCase.execute(input);
        // 4. Enviamos la respuesta exitosa
        return res.status(200).json(services);
    }
    catch (error) {
        // 5. Manejamos cualquier error inesperado del servidor
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};
