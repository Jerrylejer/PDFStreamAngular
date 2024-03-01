import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCategorieEnfantComponent } from './page-categorie-enfant.component';

describe('PageCategorieEnfantComponent', () => {
  let component: PageCategorieEnfantComponent;
  let fixture: ComponentFixture<PageCategorieEnfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageCategorieEnfantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCategorieEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
