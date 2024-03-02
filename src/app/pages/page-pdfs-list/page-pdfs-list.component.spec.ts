import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePdfsListComponent } from './page-pdfs-list.component';

describe('PagePdfsListComponent', () => {
  let component: PagePdfsListComponent;
  let fixture: ComponentFixture<PagePdfsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagePdfsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePdfsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
