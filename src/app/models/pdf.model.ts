import { Alert } from "./alert.model";
import { Category } from "./category.model";
import { Collection } from "./collection.model";
import { Donation } from "./donation.model";
import { Evaluation } from "./evaluation.model";
import { User } from "./user.model";

export class Pdf {
    id?: number;
    title?: String;
    smallDescription?: String;
    description?: String;
    image?: String;
    type?: String;
    pdfFile?: Uint8Array; 
    size?: number;
    counter?: number;
    authorId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    categories?: Category[];
    collections?: Collection[];
    author?: User;
    evaluations?: Evaluation[];
    alerts?: Alert[];
    donations?: Donation[]
}
