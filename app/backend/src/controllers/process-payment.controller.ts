import { Request, Response } from 'express';
import { processPaymentUseCase } from '../dependencies.js'; 
import { ProcessPaymentInput } from '../../../../domain/dist/use-cases/finance/process-payment.use-case.js';
// Importamos PaymentMethod para asegurar el tipo de dato
import { PaymentMethod } from '../../../../domain/dist/entities/finance/payment.js';

export const processPaymentController = async (req: Request, res: Response) => {
    try {
        // 1. Obtenemos los datos del webhook o sistema externo
        const { invoiceId, amount, method, transactionId } = req.body; 

        if (!invoiceId || !amount || !method) {
            return res.status(400).json({ error: 'Faltan datos requeridos (invoiceId, amount, method).' });
        }

        // 2. Preparamos el input (el método de pago debe ser un tipo válido)
        const input: ProcessPaymentInput = { 
            invoiceId, 
            amount: Number(amount),
            method: method as PaymentMethod, // Hacemos cast a nuestro tipo PaymentMethod (el caso de uso validará)
            transactionId
        };

        // 3. Llamamos al caso de uso (registra el pago y actualiza la factura)
        const payment = await processPaymentUseCase.execute(input);

        // 4. Enviamos la respuesta exitosa (200 OK)
        return res.status(200).json({
            message: "Pago procesado y factura actualizada.",
            paymentId: payment.id,
            invoiceId: payment.invoiceId
        });

    } catch (error) {
        if (error instanceof Error) {
            // Manejamos errores de lógica (factura no encontrada, ya pagada, monto insuficiente)
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message }); // 404 Invoice not found
            }
            if (error.message.includes('not pending') || error.message.includes('amount is less')) {
                return res.status(400).json({ error: error.message }); // 400 Bad Request
            }
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido en el servidor.' });
    }
};