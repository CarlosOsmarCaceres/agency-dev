// 👇 1. Descomentamos y usamos el caso de uso (debe estar en dependencies.ts)
import { checkoutUseCase } from '../dependencies.js';
export const checkoutController = async (req, res) => {
    try {
        // 1. Obtenemos el ID del Cliente del token
        const actingUserId = req.user.id;
        // Creamos el input para el caso de uso (vacío, ya que todo está en el carrito)
        const input = { actingUserId };
        // 2. EJECUTAR LA LÓGICA FINAL
        // El use case devuelve el proyecto creado.
        const project = await checkoutUseCase.execute(input);
        // 3. Enviamos la respuesta exitosa (201 Created por ser una creación)
        return res.status(201).json({
            message: "Checkout exitoso. Proyecto e Factura creados.",
            project: project,
        });
    }
    catch (error) {
        // 4. Manejamos errores (Carrito vacío, Servicio no encontrado, etc.)
        if (error instanceof Error) {
            // 404 (Recurso no encontrado/Carrito vacío)
            if (error.message.includes('not found') || error.message.includes('empty')) {
                return res.status(404).json({ error: error.message });
            }
            // 401 (Error de token vs BD)
            if (error.message.includes('User not found')) {
                return res.status(401).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unexpected error occurred during checkout.' });
    }
};
