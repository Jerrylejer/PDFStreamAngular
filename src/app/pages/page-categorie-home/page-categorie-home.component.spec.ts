import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCategorieHomeComponent } from './page-categorie-home.component';

describe('PageCategorieHomeComponent', () => {
  let component: PageCategorieHomeComponent;
  let fixture: ComponentFixture<PageCategorieHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageCategorieHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCategorieHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
