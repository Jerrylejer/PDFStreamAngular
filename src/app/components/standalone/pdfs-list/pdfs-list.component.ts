import { Component, Input } from '@angular/core';
import { Pdf } from 'src/app/models/pdf.model';

@Component({
  selector: 'app-pdfs-list',
  templateUrl: './pdfs-list.component.html',
  styleUrl: './pdfs-list.component.css'
})
export class PdfsListComponent {

  @Input() thisCategoryPdfsList: Pdf[] = [];
}
