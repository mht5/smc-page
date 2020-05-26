import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Company } from 'src/app/company/models/company.model';
import { CompanyService } from 'src/app/company/services/company.service';
import { StockService } from 'src/app/company/services/stock.service';
import { DisplayService } from 'src/app/core/services/display.service';

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
  datesWithMissingData: string;
  resultReady: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private companyService: CompanyService,
    private stockService: StockService,
    private displayService: DisplayService
  ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.company = this.companyService.getCompany(this.companyId);
    this.displayService.setMsg([]);
  }

  search() {
    if (this.fromDate == undefined) {
      this.fromDate = '2000/01/01';
    } else {
      this.fromDate = this.datePipe.transform(this.fromDate, 'yyyy/MM/dd');
    }
    if (this.toDate == undefined) {
      var date = new Date();
      this.toDate = this.datePipe.transform(date, 'yyyy/MM/dd');
    } else {
      this.toDate = this.datePipe.transform(this.toDate, 'yyyy/MM/dd');
    }
    console.log('search missing data for ' + this.company['name'] + ' from ' + this.fromDate + ' to ' + this.toDate);
    this.stockService.getMissingData(this.companyId, this.fromDate, this.toDate).subscribe(
      data => {
        this.datesWithMissingData = '';
        for (let date of data) {
          this.datesWithMissingData = this.datesWithMissingData + this.datePipe.transform(date, 'yyyy/MM/dd') + ', ';
        }
        this.datesWithMissingData = this.datesWithMissingData.substr(0, this.datesWithMissingData.length - 2);
        this.resultReady = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  clear() {
    this.fromDate = undefined;
    this.toDate = undefined;
  }

}
