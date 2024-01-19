import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePdfComponent } from './page-pdf.component';

describe('PagePdfComponent', () => {
  let component: PagePdfComponent;
  let fixture: ComponentFixture<PagePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagePdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
