import { deleteCategoryUseCase } from '../dependencies.js';
export const deleteCategoryController = async (req, res) => {
    try {
        const actingUserId = req.user.id;
        const { id: categoryId } = req.params;
        const input = {
            actingUserId,
            categoryId: categoryId // 👈 Forzar string
        };
        // Ejecutamos el borrado
        await deleteCategoryUseCase.execute(input);
        // Retornamos 200 OK con un JSON (para que el frontend pueda leerlo fácilmente)
        return res.status(200).json({ message: 'Categoría eliminada correctamente' });
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
