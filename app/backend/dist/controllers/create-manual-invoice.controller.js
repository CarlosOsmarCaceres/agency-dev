import { createManualInvoiceUseCase } from '../dependencies.js';
export const createManualInvoiceController = async (req, res) => {
    try {
        const actingUserId = req.user.id;
        // 1. Obtenemos los datos necesarios
        const { projectId, amount, description } = req.body;
        if (!projectId || !amount) {
            return res.status(400).json({ error: 'Faltan datos requeridos (projectId, amount).' });
        }
        // 2. Preparamos el input
        const input = {
            actingUserId,
            projectId,
            amount: Number(amount), // Asegurar que sea número
            description
        };
        // 3. Llamamos al caso de uso (verifica permisos y crea la factura)
        const invoice = await createManualInvoiceUseCase.execute(input);
        // 4. Enviamos la respuesta exitosa (201 Created)
        return res.status(201).json(invoice);
    }
    catch (error) {
        if (error instanceof Error) {
            // Manejamos errores de lógica (autorización, proyecto no encontrado)
            if (error.message.includes('Authorization failed')) {
                return res.status(403).json({ error: error.message }); // 403 Forbidden
            }
            if (error.message.includes('Project not found')) {
                return res.status(404).json({ error: error.message }); // 404 Project not found
            }
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};
