import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfsListComponent } from './pdfs-list.component';

describe('PdfsListComponent', () => {
  let component: PdfsListComponent;
  let fixture: ComponentFixture<PdfsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
