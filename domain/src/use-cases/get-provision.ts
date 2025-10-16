import { Provision } from "../entities";

interface  ProvisionService {
    getByIdd(id: string): Promise<Provision | undefined>;
}

// Define la forma de los datos de entrada
interface GetProvisionData { 
    dependencies: { provisionService: ProvisionService }; 
    payload: { 
        id: string;
        title?: string;
        description?: string;
        price?: number;
        clientId?: string;
    }; 
}

// La función que contiene la lógica
export async function getProvision({ dependencies, payload }: GetProvisionData){ 
/*     await dependencies.provisionService.getByIdd(payload.id);  */  
    
    return {id: payload.id, title: payload.title!, description: payload.description!, price: payload.price!, clientId: payload.clientId!}; 
}