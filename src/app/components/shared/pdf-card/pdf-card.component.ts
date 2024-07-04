import { Component, Input, Pipe } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Pdf } from 'src/app/models/pdf.model';

@Component({
  selector: 'app-pdf-card',
  templateUrl: './pdf-card.component.html',
  styleUrl: './pdf-card.component.css'
})
export class PdfCardComponent {
  @Input() thisCategoryPdfsList!:Pdf[];
  // Pour récupérer l'id catégory dans le routerLink
  @Input() parentCategory?: Category;

}
