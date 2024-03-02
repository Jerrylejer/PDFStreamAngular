import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChildCardComponent } from './category-child-card.component';

describe('CategoryChildCardComponent', () => {
  let component: CategoryChildCardComponent;
  let fixture: ComponentFixture<CategoryChildCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryChildCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryChildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
