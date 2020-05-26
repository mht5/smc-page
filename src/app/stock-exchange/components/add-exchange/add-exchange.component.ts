import { Component, OnInit } from '@angular/core';

import { StockExchange } from 'src/app/stock-exchange/models/stock-exchange.model';
import { StockExchangeService } from 'src/app/stock-exchange/services/stock-exchange.service';
import { DisplayService } from 'src/app/core/services/display.service';
import { ConfigService } from 'src/app/core/services/config.service';

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
  constructor(
    private stockExchangeService: StockExchangeService,
    private displayService: DisplayService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.displayService.setMsg([]);
  }

  create() {
    console.log('create stock exchange: ', this.stockExchange);
    this.stockExchangeService.addStockExchange(this.stockExchange).subscribe(
      data => {
        if (data) {
          this.displayService.setMsg(['success', 'The stock exchange has been created.']);
          this.clear();
          this.stockExchangeService.getStockExchanges().subscribe(
            data => {
              this.configService.setStockExchangeInfo(data);
            },
            err => {
              console.log(err);
            }
          );
        } else {
          this.displayService.setMsg(['error', 'The stock exchange has not been created.']);
        }
      },
      err => {
        console.log(err);
      }
    );
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
