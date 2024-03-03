import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubchildCardComponent } from './category-subchild-card.component';

describe('CategorySubchildCardComponent', () => {
  let component: CategorySubchildCardComponent;
  let fixture: ComponentFixture<CategorySubchildCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorySubchildCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorySubchildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
