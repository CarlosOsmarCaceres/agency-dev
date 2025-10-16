import { Provision } from "../entities";
import { ProvisionService } from "../services/provision-service";

// Define la forma de los datos de entrada
interface GetProvisionData { 
    dependencies: { provisionService: ProvisionService }; 
    payload: { 
        id: string;

    }; 
}

// La función que contiene la lógica
export async function getProvision({ dependencies, payload }: GetProvisionData){ 
    const result = await dependencies.provisionService.getByIdd(payload.id);

    if (!result) {
        return new Error('Provision not found');
    }

    return { id: payload.id, title: result?.title, description: result?.description,price: result?.price, clientId: result?.clientId }; 
}