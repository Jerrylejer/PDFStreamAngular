import { Pdf } from "./pdf.model";

export class Category {
    localeCompare(b: Category): number {
      throw new Error('Method not implemented.');
    }
    id?: number;
    title?: string;
    parentId?: Category;
    children?: Category[];
    createdAt?: Date;
    updatedAt?: Date;
    pdfList?: Pdf[]
}
