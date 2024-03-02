import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLeftNavComponent } from './category-left-nav.component';

describe('CategoryLeftNavComponent', () => {
  let component: CategoryLeftNavComponent;
  let fixture: ComponentFixture<CategoryLeftNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryLeftNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
