import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListePdfsComponent } from './page-liste-pdfs.component';

describe('PageListePdfsComponent', () => {
  let component: PageListePdfsComponent;
  let fixture: ComponentFixture<PageListePdfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageListePdfsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageListePdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
