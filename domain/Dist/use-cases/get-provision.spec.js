"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Aqui es donde vamos a pensar casos de exito y de error, que es lo que esperamo y que 
const vitest_1 = require("vitest");
const get_provision_1 = require("./get-provision");
const dataProvision = [
    {
        id: '1',
        title: 'Sample Provision',
        description: 'This is a sample provision description.',
        price: 100,
        clientId: '1'
    },
    {
        id: '2',
        title: 'Another Provision',
        description: 'This is another provision description.',
        price: 200,
        clientId: '1'
    },
    {
        id: '3',
        title: 'Third Provision',
        description: 'This is the third provision description.',
        price: 300,
        clientId: '1'
    }
];
(0, vitest_1.describe)('Get Provision Use Case', async () => {
    // 1. Creación de un "Mock" o "Doble de Prueba"
    const provisionService = {
        getByIdd: async (id) => {
            return dataProvision.find((provisionn) => provisionn.id == id);
        },
    };
    // 2. Test del caso de éxito
    (0, vitest_1.test)('Con un id va a obtener la informacion de un provision', async () => {
        // 3. Ejecución del caso de uso
        const result = await (0, get_provision_1.getProvision)({
            dependencies: { provisionService }, // 4. Inyección de la dependencia
            payload: { id: '1' }
        });
        // 5. Verificación (Assertion)
        (0, vitest_1.expect)(result).toStrictEqual({
            id: '1',
            title: 'Sample Provision',
            description: 'This is a sample provision description.',
            price: 100,
            clientId: '1'
        });
    });
    // 6. Test del caso de error (pendiente)
    (0, vitest_1.test)('Con un id invalido deberia devolver un error', async () => {
        const result = await (0, get_provision_1.getProvision)({
            dependencies: { provisionService }, // 4. Inyección de la dependencia
            payload: {
                id: "4",
            },
        });
        (0, vitest_1.expect)(result).toBeInstanceOf(Error);
    });
});
//# sourceMappingURL=get-provision.spec.js.map