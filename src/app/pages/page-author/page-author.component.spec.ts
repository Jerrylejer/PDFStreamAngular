import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAuthorComponent } from './page-author.component';

describe('PageAuthorComponent', () => {
  let component: PageAuthorComponent;
  let fixture: ComponentFixture<PageAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAuthorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
