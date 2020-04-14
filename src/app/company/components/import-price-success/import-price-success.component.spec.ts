import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPriceSuccessComponent } from './import-price-success.component';

describe('ImportPriceSuccessComponent', () => {
  let component: ImportPriceSuccessComponent;
  let fixture: ComponentFixture<ImportPriceSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPriceSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPriceSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
