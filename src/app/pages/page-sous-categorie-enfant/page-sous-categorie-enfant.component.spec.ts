import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSousCategorieEnfantComponent } from './page-sous-categorie-enfant.component';

describe('PageSousCategorieEnfantComponent', () => {
  let component: PageSousCategorieEnfantComponent;
  let fixture: ComponentFixture<PageSousCategorieEnfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageSousCategorieEnfantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageSousCategorieEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
