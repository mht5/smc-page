import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { IPO } from 'src/app/company/models/ipo.model';
import { IpoService } from 'src/app/company/services/ipo.service';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-update-ipo',
  templateUrl: './update-ipo.component.html',
  styleUrls: ['./update-ipo.component.css'],
  providers: [DatePipe]
})
export class UpdateIpoComponent implements OnInit {
  title = 'Update IPO';
  companyId: string;
  ipo: IPO;
  ipoBeforeEdit = {};
  hours = [
    { 'time': '00:00:00', 'label': '00: 00' }, { 'time': '01:00:00', 'label': '01: 00' },
    { 'time': '02:00:00', 'label': '02: 00' }, { 'time': '03:00:00', 'label': '03: 00' },
    { 'time': '04:00:00', 'label': '04: 00' }, { 'time': '05:00:00', 'label': '05: 00' },
    { 'time': '06:00:00', 'label': '06: 00' }, { 'time': '07:00:00', 'label': '07: 00' },
    { 'time': '08:00:00', 'label': '08: 00' }, { 'time': '09:00:00', 'label': '09: 00' },
    { 'time': '10:00:00', 'label': '10: 00' }, { 'time': '11:00:00', 'label': '11: 00' },
    { 'time': '12:00:00', 'label': '12: 00' }, { 'time': '13:00:00', 'label': '13: 00' },
    { 'time': '14:00:00', 'label': '14: 00' }, { 'time': '15:00:00', 'label': '15: 00' },
    { 'time': '16:00:00', 'label': '16: 00' }, { 'time': '17:00:00', 'label': '17: 00' },
    { 'time': '18:00:00', 'label': '18: 00' }, { 'time': '19:00:00', 'label': '19: 00' },
    { 'time': '20:00:00', 'label': '20: 00' }, { 'time': '21:00:00', 'label': '21: 00' },
    { 'time': '22:00:00', 'label': '22: 00' }, { 'time': '23:00:00', 'label': '23: 00' },
  ];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private ipoService: IpoService,
    private displayService: DisplayService
  ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.findIpoByCompanyId(this.companyId);
    this.displayService.setMsg([]);
  }

  findIpoByCompanyId(companyId: string) {
    this.ipoService.findIpoByCompanyId(companyId).subscribe(
      data => {
        this.ipo = data;
        var openDateTime = this.ipo.openDateTime;
        this.ipo.openDate = openDateTime.substr(0, 10);
        this.ipo.openTime = openDateTime.substr(11, 5) + ':00';
        Object.assign(this.ipoBeforeEdit, this.ipo);
      },
      err => {
        console.log(err);
      }
    );
    /* return {
      'id': 1,
      'stockExchangeId': '12',
      'stockCode': 'NSW',
      'pricePerShare': 12,
      'numberOfShares': 2000,
      'openDateTime': '2020-04-06 12:00',
      'openDate': '2020-04-06',
      'openTime': '12:00',
      'remarks': 'this IPO starts soon.'
    } */
  }

  update() {
    if (this.ipo['openDate'] != undefined) {
      if (this.ipo['openTime'] != undefined) {
        this.ipo['openDateTime'] = this.datePipe.transform(this.ipo['openDate'], 'yyyy-MM-dd') + ' ' + this.ipo['openTime'];
      } else {
        this.ipo['openDateTime'] = this.datePipe.transform(this.ipo['openDate'], 'yyyy-MM-dd') + ' 00:00';
      }
    }
    console.log('update IPO: ', this.ipo);
    this.ipoService.updateIpo(this.ipo).subscribe(
      data => {
        if (data) {
          if (data) {
            this.displayService.setMsg(['success', 'The IPO information has been updated.']);
            Object.assign(this.ipoBeforeEdit, this.ipo);
          } else {
            this.displayService.setMsg(['error', 'The IPO information has not been updated.']);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  clear() {
    console.log(this.ipoBeforeEdit);
    Object.assign(this.ipo, this.ipoBeforeEdit);
  }

}
