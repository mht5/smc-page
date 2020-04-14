import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Company } from 'src/app/company/models/company.model';
import { IPO } from 'src/app/company/models/ipo.model';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
  providers: [DatePipe]
})
export class AddCompanyComponent implements OnInit {
  title = 'Add Company';
  company: Company = {
    'id': null,
    'name': null,
    'sectorId': null,
    'turnover': null,
    'ceo': null,
    'boardOfDirectors': null,
    'listedInStockExchanges': 'Y',
    'briefWriteup': null
  }
  ipo: IPO = {
    'id': null,
    'stockExchangeId': null,
    'stockCode': null,
    'pricePerShare': null,
    'numberOfShares': null,
    'openDateTime': null,
    'remarks': null
  };
  hours = [
    { 'time': '00:00', 'label': '00: 00' }, { 'time': '01:00', 'label': '01: 00' },
    { 'time': '02:00', 'label': '02: 00' }, { 'time': '03:00', 'label': '03: 00' },
    { 'time': '04:00', 'label': '04: 00' }, { 'time': '05:00', 'label': '05: 00' },
    { 'time': '06:00', 'label': '06: 00' }, { 'time': '07:00', 'label': '07: 00' },
    { 'time': '08:00', 'label': '08: 00' }, { 'time': '09:00', 'label': '09: 00' },
    { 'time': '10:00', 'label': '10: 00' }, { 'time': '11:00', 'label': '11: 00' },
    { 'time': '12:00', 'label': '12: 00' }, { 'time': '13:00', 'label': '13: 00' },
    { 'time': '14:00', 'label': '14: 00' }, { 'time': '15:00', 'label': '15: 00' },
    { 'time': '16:00', 'label': '16: 00' }, { 'time': '17:00', 'label': '17: 00' },
    { 'time': '18:00', 'label': '18: 00' }, { 'time': '19:00', 'label': '19: 00' },
    { 'time': '20:00', 'label': '20: 00' }, { 'time': '21:00', 'label': '21: 00' },
    { 'time': '22:00', 'label': '22: 00' }, { 'time': '23:00', 'label': '23: 00' },
  ];

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
  }

  create() {
    console.log('create company: ', this.company);
    if (this.ipo['openDate'] != undefined) {
      if (this.ipo['openTime'] != undefined) {
        this.ipo['openDateTime'] = this.datePipe.transform(this.ipo['openDate'], 'yyyy-MM-dd') + ' ' + this.ipo['openTime'];
      } else {
        this.ipo['openDateTime'] = this.datePipe.transform(this.ipo['openDate'], 'yyyy-MM-dd') + ' 00:00';
      }
    }
    console.log(this.ipo);
  }

  clear() {
    this.company = {
      'id': null,
      'name': null,
      'sectorId': null,
      'turnover': null,
      'ceo': null,
      'boardOfDirectors': null,
      'listedInStockExchanges': 'Y',
      'briefWriteup': null
    };
    this.ipo = {
      'id': null,
      'stockExchangeId': null,
      'stockCode': null,
      'pricePerShare': null,
      'numberOfShares': null,
      'openDateTime': null,
      'remarks': null
    }
  }

}
