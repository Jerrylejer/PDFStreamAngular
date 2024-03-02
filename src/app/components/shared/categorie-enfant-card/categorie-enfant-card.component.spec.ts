import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieEnfantCardComponent } from './categorie-enfant-card.component';

describe('CategorieEnfantCardComponent', () => {
  let component: CategorieEnfantCardComponent;
  let fixture: ComponentFixture<CategorieEnfantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorieEnfantCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorieEnfantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
