import { Component, OnInit } from '@angular/core';
import { StockExchange } from 'src/app/stock-exchange/models/stock-exchange.model';

@Component({
  selector: 'app-add-exchange',
  templateUrl: './add-exchange.component.html',
  styleUrls: ['./add-exchange.component.css']
})
export class AddExchangeComponent implements OnInit {
  title = 'Add Stock Exchange';
  stockExchange: StockExchange = {
    'id': null,
    'name': null,
    'brief': null,
    'contactAddress': null,
    'remarks': null
  };
  constructor() { }

  ngOnInit() {
  }

  create() {
    console.log('create stock exchange: ', this.stockExchange);
  }

  clear() {
    this.stockExchange = {
      'id': null,
      'name': null,
      'brief': null,
      'contactAddress': null,
      'remarks': null
    };
  }

}
