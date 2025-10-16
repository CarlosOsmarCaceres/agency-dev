import { ProvisionService } from "../services/provision-service";
interface GetProvisionData {
    dependencies: {
        provisionService: ProvisionService;
    };
    payload: {
        id: string;
    };
}
export declare function getProvision({ dependencies, payload }: GetProvisionData): Promise<Error | {
    id: string;
    title: string;
    description: string;
    price: number;
    clientId: string;
}>;
export {};
//# sourceMappingURL=get-provision.d.ts.map