import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSousCategorieComponent } from './page-sous-categorie.component';

describe('PageSousCategorieComponent', () => {
  let component: PageSousCategorieComponent;
  let fixture: ComponentFixture<PageSousCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageSousCategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageSousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
