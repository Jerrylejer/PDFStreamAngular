import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCategoryChildComponent } from './page-category-child.component';

describe('PageCategoryChildComponent', () => {
  let component: PageCategoryChildComponent;
  let fixture: ComponentFixture<PageCategoryChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageCategoryChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCategoryChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
