import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {

  constructor(
    private httpService: HttpService
  ) { }

  getStockExchanges(): Observable<any[]> {
    var url = 'stock/list-all';
    return this.httpService.get(url).pipe();
  }

  addStockExchange(stockExchange): Observable<any> {
    var url = 'stock/add';
    return this.httpService.post(url, stockExchange).pipe();
  }

}
