import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCompaniesComponent } from './compare-companies.component';

describe('CompareCompaniesComponent', () => {
  let component: CompareCompaniesComponent;
  let fixture: ComponentFixture<CompareCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
