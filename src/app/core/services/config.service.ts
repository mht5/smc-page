import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  stockExchangeList: [];
  sectorList: [];

  constructor(
    private httpService: HttpService
  ) { }

  initConfiguration() {
    this.initStockExchangeInfo().subscribe(
      data => {
        this.stockExchangeList = data;
        console.log('stockExchangeList: ', this.stockExchangeList);
      },
      err => {
        console.log(err);
      }
    );
    this.initSectorInfo().subscribe(
      data => {
        this.sectorList = data;
        console.log('sectorList: ', this.sectorList);
      },
      err => {
        console.log(err);
      }
    );
  }

  initStockExchangeInfo() {
    var url = 'stock/list-all';
    return this.httpService.get(url).pipe();
  }

  initSectorInfo() {
    var url = 'company/list-sectors';
    return this.httpService.get(url).pipe();
  }

  setStockExchangeInfo(stockExchangeList) {
    this.stockExchangeList = stockExchangeList;
  }

  setSectorInfo(sectorList) {
    this.sectorList = sectorList;
  }

  getStockExchangeInfo() {
    return this.stockExchangeList;
  }

  getSectorInfo() {
    return this.sectorList;
  }

}
