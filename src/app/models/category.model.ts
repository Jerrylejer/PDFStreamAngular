import { Pdf } from "./pdf.model";

export class Category {
    id?: number;
    title?: String;
    parentId?: Category;
    children?: Category[];
    createdAt?: Date;
    updatedAt?: Date;
    pdfList?: Pdf[]
}
