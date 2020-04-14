import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-price-success',
  templateUrl: './import-price-success.component.html',
  styleUrls: ['./import-price-success.component.css']
})
export class ImportPriceSuccessComponent implements OnInit {
  title = 'Summary of Upload';
  companyName = 'Internaltional Aero Planes';
  stockExchange = 'BSE';
  numberOfRecords = 2020;
  fromDate = '2020-01-01';
  toDate = '2020-03-31';
  constructor() { }

  ngOnInit() {
  }

}
