import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Company } from 'src/app/company/models/company.model';
import { CompanyService } from 'src/app/company/services/company.service';

@Component({
  selector: 'app-missing-data',
  templateUrl: './missing-data.component.html',
  styleUrls: ['./missing-data.component.css'],
  providers: [DatePipe]
})
export class MissingDataComponent implements OnInit {
  title = 'Missing Data';
  companyId: string;
  company: Company;
  fromDate: string;
  toDate: string;
  resultReady: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.company = this.companyService.getCompany(this.companyId);
  }

  search() {
    if (this.fromDate == undefined) {
      this.fromDate = '2000-01-01';
    } else {
      this.fromDate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
    }
    if (this.toDate == undefined) {
      var date = new Date();
      this.toDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    } else {
      this.toDate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
    }
    console.log('search missing data for ' + this.company['name'] + ' from ' + this.fromDate + ' to ' + this.toDate);
    this.resultReady = true;
  }

  clear() {
    this.fromDate = undefined;
    this.toDate = undefined;
  }

}
