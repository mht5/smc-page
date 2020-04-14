import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPriceComponent } from './import-price.component';

describe('ImportPriceComponent', () => {
  let component: ImportPriceComponent;
  let fixture: ComponentFixture<ImportPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
