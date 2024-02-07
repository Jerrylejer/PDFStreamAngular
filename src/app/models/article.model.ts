import { Alert } from "./alert.model";

export class Article {
    id?: number;
    title?: String;
    description?: String;
    ordering?: number;
    createdAt?: Date;
    updatedAt?: Date;
    alertList?: Alert[]
}
