import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from 'src/app/company/models/company.model';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companyMap = new Map<string, Company>();

  constructor(
    private httpService: HttpService
  ) { }

  setCompany(company): void {
    this.companyMap.set(company['id'] + '', company);
  }

  getCompany(id): Company {
    console.log(this.companyMap);
    var company = this.companyMap.get(id);
    this.companyMap.delete(id);
    return company;
  }

  getCompanyList(): Observable<any[]> {
    var url = 'company/list-all';
    return this.httpService.get(url).pipe();
  }

  findCompanyByName(companyName): Observable<any> {
    var url = 'company/find-by-name?name=' + companyName;
    return this.httpService.get(url).pipe();
  }

  addCompany(company, ipo): Observable<any> {
    var body = {
      'company': company,
      'ipoDetail': ipo
    }
    var url = 'company/add';
    return this.httpService.post(url, body).pipe();
  }

  updateCompany(company): Observable<any> {
    var url = 'company/update';
    return this.httpService.post(url, company).pipe();
  }

  deactivateCompany(companyId): Observable<any> {
    var url = 'company/deactivate?id=' + companyId;
    return this.httpService.post(url, []).pipe();
  }

}
