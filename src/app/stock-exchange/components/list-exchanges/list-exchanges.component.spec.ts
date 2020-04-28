import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { ListExchangesComponent } from './list-exchanges.component';

describe('ListExchangesComponent', () => {
  let component: ListExchangesComponent;
  let fixture: ComponentFixture<ListExchangesComponent>;
  var el;
  var de;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        ListExchangesComponent,
        HeaderComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should component be initialized', () => {
     fixture.detectChanges();
     expect(el.querySelector('h1').innerText).toBe('Stock Exchanges');
  });
});
