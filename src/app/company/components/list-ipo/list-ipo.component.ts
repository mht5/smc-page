import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IPO } from 'src/app/company/models/ipo.model';

@Component({
  selector: 'app-list-ipo',
  templateUrl: './list-ipo.component.html',
  styleUrls: ['./list-ipo.component.css']
})
export class ListIpoComponent implements OnInit {
  title = 'List IPOs';
  ipos: IPO[];
  displayedColumns: string[] = ['id', 'stockExchangeId', 'stockCode', 'pricePerShare', 'numberOfShares', 'openDateTime', 'remarks'];
  dataSource: MatTableDataSource<IPO>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.ipos = [
      {
        'id': 1,
        'stockExchangeId': '12',
        'stockCode': 'NSW',
        'pricePerShare': 12,
        'numberOfShares': 2000,
        'openDateTime': '2020-04-26 12:00',
        'openDate': '2020-04-06',
        'openTime': '12:00',
        'remarks': 'this IPO starts soon.'
      }, {
        'id': 2,
        'stockExchangeId': '12',
        'stockCode': 'JKSF',
        'pricePerShare': 34,
        'numberOfShares': 2365,
        'openDateTime': '2020-06-12 12:00',
        'remarks': 'this IPO starts soon.'
      }, {
        'id': 3,
        'stockExchangeId': '08',
        'stockCode': 'KUS',
        'pricePerShare': 10,
        'numberOfShares': 4000,
        'openDateTime': '2020-08-06 16:00',
        'remarks': 'this IPO starts soon.'
      }, {
        'id': 4,
        'stockExchangeId': '12',
        'stockCode': 'UKL',
        'pricePerShare': 42,
        'numberOfShares': 3000,
        'openDateTime': '2020-10-06 12:00',
        'remarks': 'this IPO starts soon.'
      }, {
        'id': 5,
        'stockExchangeId': '08',
        'stockCode': 'AOP',
        'pricePerShare': 10,
        'numberOfShares': 2500,
        'openDateTime': '2020-12-06 12:00',
        'remarks': 'this IPO starts soon.'
      },
    ];
    this.dataSource = new MatTableDataSource(this.ipos);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
