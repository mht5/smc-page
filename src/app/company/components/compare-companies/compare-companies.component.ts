import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { Company } from 'src/app/company/models/company.model';
import { DisplayService } from 'src/app/core/services/display.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { CompanyService } from 'src/app/company/services/company.service';
import { StockService } from 'src/app/company/services/stock.service';

@Component({
  selector: 'app-compare-companies',
  templateUrl: './compare-companies.component.html',
  styleUrls: ['./compare-companies.component.css'],
  providers: [DatePipe]
})
export class CompareCompaniesComponent implements OnInit {
  title = 'Compare Companies';
  companies: Company[];
  compareType: string = 'compareBetweenCompanies';
  stockExchangeId: string;
  companyId1: string;
  companyId2: string;
  fromDate: string;
  toDate: string;
  chartReady: boolean = false;
  stockExchangeList: [];

  // chart
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [];
  updateButtonLabel: string = 'See Line Chart';

  constructor(
    private datePipe: DatePipe,
    private displayService: DisplayService,
    private configService: ConfigService,
    private companyService: CompanyService,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.displayService.setMsg([]);
    this.stockExchangeList = this.configService.getStockExchangeInfo();
    this.getCompanyList();
  }

  getCompanyList() {
    this.companyService.getCompanyList().subscribe(
      data => {
        this.companies = data;
        console.log(this.companies);
      },
      err => {
        console.log(err);
      }
    );
  }

  checkInput(): boolean {
    if (this.compareType == undefined) {
      alert('Please select a compare type.');
      return false;
    } else if (this.stockExchangeId == undefined) {
      alert('Please select a stock exchange.');
      return false;
    } else if (this.companyId1 == undefined) {
      alert('Please at least select 1 company.');
      return false;
    } else if (this.compareType == 'compareBetweenCompanies' && this.companyId2 == undefined) {
      alert('Please select the companies to compare.');
      return false;
    } else if (this.fromDate == undefined || this.toDate == undefined) {
      alert('Please specify the time period you want to compare.');
      return false;
    }
    return true;
  }

  generateChart() {
    if (this.checkInput()) {
      this.fromDate = this.datePipe.transform(this.fromDate, 'yyyy/MM/dd');
      this.toDate = this.datePipe.transform(this.toDate, 'yyyy/MM/dd');
      console.log('compare report info: ');
      console.log(this.compareType + ', ' + this.stockExchangeId + ', ' + this.companyId1 + ', ' + this.companyId2 + ', ' + this.fromDate + ', ' + this.toDate);
      this.stockService.getCompareReport(this.stockExchangeId, this.companyId1, this.companyId2, this.fromDate, this.toDate).subscribe(
        data => {
          this.barChartLabels = [];
          this.barChartData = [];
          var barChartDataList;
          for (let list of data) {
            barChartDataList = [];
            for (let item of list) {
              console.log(item);
              if (this.barChartLabels.indexOf(item['date']) < 0) {
                this.barChartLabels.push(item['date']);
              } 
              barChartDataList.push(item['price']);
            }
            this.barChartData.push({
              data: barChartDataList,
              label: list[0]['stockCode']
            });
          }
          this.chartReady = true;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  clear() {
    this.compareType = undefined;
    this.stockExchangeId = undefined;
    this.companyId1 = undefined;
    this.companyId2 = undefined;
    this.fromDate = undefined;
    this.toDate = undefined;
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    this.updateButtonLabel = this.updateButtonLabel === 'See Line Chart' ? 'See Bar Chart' : 'See Line Chart';
  }

  downloadChart() {
    if (this.checkInput()) {
      this.fromDate = this.datePipe.transform(this.fromDate, 'yyyy/MM/dd');
      this.toDate = this.datePipe.transform(this.toDate, 'yyyy/MM/dd');
      console.log('download chart data');
      this.stockService.downloadReport(this.stockExchangeId, this.companyId1, this.companyId2, this.fromDate, this.toDate).subscribe(
        data => {
          /*const link = document.createElement('a');
          const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
          link.setAttribute('href', window.URL.createObjectURL(blob));
          link.setAttribute('download', 'Compare-Report-' + new Date().getTime() + '.xls');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);*/


          const link = document.createElement('a');
          const blob = new Blob([data.body], { type: 'application/vnd.ms-excel' });
          let fileName = 'Compare-Report-' + new Date().getTime() + '.xls';
          /* const fileNameUnicode = data.headers.get('Content-Disposition').split('filename*=')[1];

          if (fileNameUnicode) {
            fileName = decodeURIComponent(fileNameUnicode.split('\'\'')[1]);
          } */
          link.setAttribute('href', window.URL.createObjectURL(blob));
          link.setAttribute('download', fileName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
