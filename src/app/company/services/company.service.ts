import { Injectable } from '@angular/core';
import { Company } from 'src/app/company/models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companyMap = new Map<string, Company>();

  constructor() { }

  setCompany(company): void {
    this.companyMap.set(company['id'] + '', company);
  }

  getCompany(id): Company {
    console.log(this.companyMap);
    var company = this.companyMap.get(id);
    this.companyMap.delete(id);
    return company;
  }
}
