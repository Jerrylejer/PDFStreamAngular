import { Alert } from "./alert.model";
import { Category } from "./category.model";
import { Collection } from "./collection.model";
import { Donation } from "./donation.model";
import { Evaluation } from "./evaluation.model";
import { User } from "./user.model";

export class Pdf {
    id?: number;
    smallDescription?: String;
    description?: String;
    image?: String;
    type?: String;
    file?: Uint8Array; // ou Blob si ne fonctionne pas
    size?: number;
    counter?: number;
    createdAt?: Date;
    updatedAt?: Date;
    categories?: Category[];
    collections?: Collection[];
    author?: User;
    evaluations?: Evaluation[];
    alerts?: Alert[];
    donations?: Donation[]
}
