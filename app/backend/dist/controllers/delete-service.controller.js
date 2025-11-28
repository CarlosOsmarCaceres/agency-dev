import { deleteServiceUseCase } from '../dependencies.js';
export const deleteServiceController = async (req, res) => {
    try {
        const actingUserId = req.user.id;
        // 1. Obtenemos el ID del servicio de la URL
        const { id: serviceId } = req.params;
        const input = {
            actingUserId,
            serviceId
        };
        // 2. Ejecutamos el caso de uso (verifica permisos y elimina)
        await deleteServiceUseCase.execute(input);
        // 3. Retornamos éxito
        return res.status(200).json({ message: 'Servicio eliminado correctamente' });
    }
    catch (error) {
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
