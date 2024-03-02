import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCategorySubChildComponent } from './page-category-sub-child.component';

describe('PageCategorySubChildComponent', () => {
  let component: PageCategorySubChildComponent;
  let fixture: ComponentFixture<PageCategorySubChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageCategorySubChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCategorySubChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
