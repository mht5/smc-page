import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-compare-companies',
  templateUrl: './compare-companies.component.html',
  styleUrls: ['./compare-companies.component.css'],
  providers: [DatePipe]
})
export class CompareCompaniesComponent implements OnInit {
  title = 'Compare Companies';
  compareType: string;
  stockExchangeId: string;
  companyName1: string;
  companyName2: string;
  fromDate: string;
  toDate: string;
  chartReady: boolean = false;

  // chart
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = ['04-04', '04-05', '04-06', '04-07', '04-08', '04-09', '04-10'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Company 1' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Company 2' },
    { data: [12, 43, 87, 45, 98, 54, 67], label: 'Company 3' }
  ];
  updateButtonLabel: string = 'See Line Chart';

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
  }

  checkInput(): boolean {
    if (this.compareType == undefined) {
      alert('Please select a compare type.');
      return false;
    } else if (this.stockExchangeId == undefined) {
      alert('Please select a stock exchange.');
      return false;
    } else if (this.companyName1 == undefined) {
      alert('Please at least select 1 company.');
      return false;
    } else if (this.compareType == 'compareBetweenCompanies' && this.companyName2 == undefined) {
      alert('Please select the companies to compare.');
      return false;
    } else if (this.fromDate == undefined || this.toDate == undefined) {
      alert('Please specify the time period you want to compare.');
      return false;
    }
    return true;
  }

  generateChart() {
    //if (this.checkInput()) {
      this.fromDate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
      this.toDate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
      console.log('compare report info: ');
      console.log(this.compareType + ', ' + this.stockExchangeId + ', ' + this.companyName1 + ', ' + this.companyName2 + ', ' + this.fromDate + ', ' + this.toDate);
      this.chartReady = true;
    //}
  }

  clear() {
    this.compareType = undefined;
    this.stockExchangeId = undefined;
    this.companyName1 = undefined;
    this.companyName2 = undefined;
    this.fromDate = undefined;
    this.toDate = undefined;
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    this.updateButtonLabel = this.updateButtonLabel === 'See Line Chart' ? 'See Bar Chart' : 'See Line Chart';
  }

  downloadChart() {
    console.log('download chart data');
  }

}
