import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private httpService: HttpService
  ) { }

  getMissingData(companyId, fromDate, toDate): Observable<any[]> {
    var url = 'stock/missing-data?companyId=' + companyId + '&fromDate=' + fromDate + '&toDate=' + toDate;
    return this.httpService.get(url).pipe();
  }

  importStockPrice(file): Observable<any> {
    var url = 'stock/import-price';
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('content-type', 'need-delete');
    this.httpService.combineHeaders(headers);
    return this.httpService.post(url, formData);
  }

  getCompareReport(stockExchangeId, companyId1, companyId2, fromDate, toDate): Observable<any> {
    var url = 'stock/compare-between-companies?stockExchangeId=' + stockExchangeId + '&companyId1=' + companyId1
      + '&companyId2=' + companyId2 + '&fromDate=' + fromDate + '&toDate=' + toDate;
    return this.httpService.get(url).pipe();
  }

  downloadReport(stockExchangeId, companyId1, companyId2, fromDate, toDate): Observable<any> {
    var url = 'stock/exportReport?stockExchangeId=' + stockExchangeId + '&companyId1=' + companyId1
      + '&companyId2=' + companyId2 + '&fromDate=' + fromDate + '&toDate=' + toDate;
    return this.httpService.getWithDownloadFile(url).pipe();
  }

}
