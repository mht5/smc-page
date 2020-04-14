import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIpoComponent } from './list-ipo.component';

describe('ListIpoComponent', () => {
  let component: ListIpoComponent;
  let fixture: ComponentFixture<ListIpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
