import { Request, Response } from 'express';
import { viewCartUseCase } from '../dependencies.js';

export const viewCartController = async (req: Request, res: Response) => {
    try {
        // 1. Obtenemos el ID del usuario del token
        // Usamos '!' porque el authMiddleware garantiza que req.user existe
        const actingUserId = req.user!.id; 

        // 2. Llamamos al caso de uso
        const detailedCart = await viewCartUseCase.execute({ actingUserId });

        // 3. Manejamos el caso de que el carrito esté vacío
        if (!detailedCart) {
            // Devolvemos una estructura consistente, incluso si está vacío
            return res.status(200).json({ 
                id: null, 
                items: [], 
                message: "El carrito está vacío." 
            });
        }

        // 4. Enviamos la respuesta exitosa
        return res.status(200).json(detailedCart); 

    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('User not found')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};