import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from 'src/app/company/models/company.model';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class IpoService {

  constructor(
    private httpService: HttpService
  ) { }

  getPlannedIpos(): Observable<any[]> {
    var url = 'company/view-planned-ipo';
    return this.httpService.get(url).pipe();
  }

  findIpoByCompanyId(companyId): Observable<any> {
    var url = 'company/find-ipo-by-company-id?companyId=' + companyId;
    return this.httpService.get(url).pipe();
  }

  updateIpo(ipo): Observable<any> {
    var url = 'company/update-ipo';
    return this.httpService.post(url, ipo).pipe();
  }

}
