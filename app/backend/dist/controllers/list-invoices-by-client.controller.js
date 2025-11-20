import { listInvoicesByClientUseCase } from '../dependencies.js';
export const listInvoicesByClientController = async (req, res) => {
    try {
        const actingUserId = req.user.id;
        // 1. Obtener el ID del cliente de los parámetros de la URL
        const { clientId } = req.params;
        if (!clientId) {
            return res.status(400).json({ error: 'El ID del cliente (clientId) es requerido.' });
        }
        const input = {
            actingUserId,
            clientId
        };
        // 2. Llamamos al caso de uso (verifica permisos y busca)
        const invoices = await listInvoicesByClientUseCase.execute(input);
        // 3. Enviamos la respuesta exitosa
        return res.status(200).json(invoices);
    }
    catch (error) {
        if (error instanceof Error) {
            // Manejamos errores de autorización (403)
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message }); // 403 Forbidden
            }
            // 404 si el cliente no existe (aunque el caso de uso devuelve array vacío)
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};
