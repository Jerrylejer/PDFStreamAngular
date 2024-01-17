import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCharteComponent } from './page-charte.component';

describe('PageCharteComponent', () => {
  let component: PageCharteComponent;
  let fixture: ComponentFixture<PageCharteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageCharteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCharteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
