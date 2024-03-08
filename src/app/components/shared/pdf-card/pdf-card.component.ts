import { Component, Input } from '@angular/core';
import { Pdf } from 'src/app/models/pdf.model';

@Component({
  selector: 'app-pdf-card',
  templateUrl: './pdf-card.component.html',
  styleUrl: './pdf-card.component.css'
})
export class PdfCardComponent {

  @Input() thisCategoryPdfsList:Pdf[] = [];
}
