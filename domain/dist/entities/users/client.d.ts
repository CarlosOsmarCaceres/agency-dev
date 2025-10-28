import { Entity } from "../../utils/type/entity.js";
import { User } from "./user.js";
export interface Client extends Entity {
    userId: User['id'];
    companyName?: string;
    contactPhone: string;
}
//# sourceMappingURL=client.d.ts.map